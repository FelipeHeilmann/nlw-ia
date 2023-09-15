import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { pipeline } from "node:stream";
import fs, { createReadStream } from "node:fs";
import { promisify } from "node:util";
import { VideoServices } from "../../application/services/VideoServices";
import { openai } from '../../infra/openia'

const pump = promisify(pipeline)

export class VideoController {
    constructor(private readonly videoServices: VideoServices) { }

    async upload(req: FastifyRequest, reply: FastifyReply) {
        const data = await req.file()

        if (!data) {
            return reply.status(400).send({ error: 'Missing file input' })
        }

        const extension = path.extname(data.filename)

        if (extension !== '.mp3') {
            return reply.status(400).send({
                error: 'Invalid input type, please upload a MP3'
            })
        }

        const fileBaseName = path.basename(data.filename, extension)

        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

        const uploadDestination = path.resolve(__dirname, "../../../temp", fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        const video = await this.save({
            name: data.filename,
            path: uploadDestination,
            transcription: null
        })

        return reply.status(201).send(video)
    }

    async save(input: inputVideo) {
        return await this.videoServices.save({ name: input.name, path: input.path, trenscription: input.transcription })
    }

    async transcript(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { prompt } = req.body as { prompt: string }

        const video = await this.videoServices.getById(id)

        const videoPath = video.path

        const audioReadStream = createReadStream(videoPath)

        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt
        })

        await this.videoServices.transcript(video.id, response.text)

        return reply.status(200).send(response.text)

    }

    async iaComplete(req: FastifyRequest, reply: FastifyReply) {
        const { videoId, temperature = 0.5, template } = req.body as { videoId: string, temperature: number, template: string }

        const video = await this.videoServices.getById(videoId)

        if (!video.transcription) {
            return reply.status(400).send({ error: 'Video transcription was not generated yet.' })
        }

        const promptMessage = template.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [{
                role: 'user',
                content: promptMessage
            }]
        })
    }

}

type inputVideo = {
    name: string
    path: string
    transcription?: string | null
}