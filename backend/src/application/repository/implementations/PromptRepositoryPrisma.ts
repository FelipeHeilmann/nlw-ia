import { Prompt } from "../../../domain/Prompt";
import { IPromptRepository } from "../IPromptRepository";
import { PrismaClient } from '@prisma/client'

export class PromptRepositoryPrimsa implements IPromptRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(prompt: Prompt): Promise<void> {
        await this.prisma.prompt.create({
            data: {
                id: prompt.id,
                title: prompt.title,
                template: prompt.template
            }
        })
    }
    async getAll(): Promise<Prompt[]> {
        const prompts = await this.prisma.prompt.findMany()

        return prompts
    }
    async getById(id: string): Promise<Prompt> {
        const prompt = await this.prisma.prompt.findFirstOrThrow({
            where: {
                id: id
            }
        })

        return prompt
    }
    async update(prompt: Prompt): Promise<void> {
        await this.prisma.prompt.update({
            where: {
                id: prompt.id
            },
            data: {
                id: prompt.id,
                title: prompt.title,
                template: prompt.template
            }
        })

    }
    async delete(id: string): Promise<void> {
        await this.prisma.prompt.delete({
            where: {
                id: id
            }
        })
    }

}