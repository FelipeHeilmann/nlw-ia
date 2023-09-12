import { Prompt } from "../../domain/Prompt";

export interface IPromptRepository {
    save(prompt: Prompt): Promise<void>

    getAll(): Promise<Prompt[]>

    getById(id: string): Promise<Prompt>

    update(promt: Prompt): Promise<void>

    delete(id: string): Promise<void>

}