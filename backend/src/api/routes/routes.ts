import { FastifyInstance } from "fastify";
import { promptController } from "../../application/services";

export const router = (app: FastifyInstance) => {
    app.get('/prompts', async function (req, res) {
        return promptController.handleGetAll(req, res)
    })
}