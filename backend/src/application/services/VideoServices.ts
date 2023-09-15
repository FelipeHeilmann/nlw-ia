import { type } from "os";
import { IVideoRepository } from "../repository/IVideoRepository";
import { Video } from "../../domain/Video";

import fastifyMultipart from "@fastify/multipart";

export class VideoServices {
    constructor(private readonly repository: IVideoRepository) { }


    async save(input: videoDTO) {
        const video = new Video(
            input.name,
            input.path,
            input.trenscription ? input.trenscription : null
        )

        await this.repository.save(video)

        return video
    }

    async getById(id: string) {
        return await this.repository.getById(id)
    }

    async transcript(id: string, transcript: string) {
        const video = await this.repository.getById(id)

        video.transcription = transcript

        await this.repository.update(video)
    }
}

type videoDTO = {
    name: string
    path: string
    trenscription?
}