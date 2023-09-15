import { FastifyRequest, FastifyReply } from "fastify";
import { PromptServices } from "../../application/services/PromptServices";

export class PromptController {
    constructor(private readonly promptServices: PromptServices) { }

    async handleGetAll(req: FastifyRequest, reply: FastifyReply) {
        const prompts = await this.promptServices.getAll()

        reply.status(200).send(prompts)
    }
}