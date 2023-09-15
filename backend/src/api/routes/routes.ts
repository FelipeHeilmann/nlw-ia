import { FastifyInstance } from "fastify";
import { promptController, videoController } from "../../application/services";

export const router = async (app: FastifyInstance) => {
    app.get('/prompts', async function (req, res) {
        return promptController.getAll(req, res)
    })

    app.post('/videos', async function (req, res) {
        return videoController.upload(req, res)
    })

    app.post('/videos/:id/transcription', async function (req, res) {
        return videoController.transcript(req, res)
    })
}