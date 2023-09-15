import { IPromptRepository } from "../repository/IPromptRepository";

export class PromptServices {
    constructor(private readonly repository: IPromptRepository) { }

    async getAll() {
        const prompts = await this.repository.getAll()

        return prompts
    }
}