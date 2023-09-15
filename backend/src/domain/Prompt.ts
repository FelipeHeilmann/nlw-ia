import { v4 as uuidv4 } from "uuid";

export class Prompt {
    public id: string
    public title: string
    public template: string


    constructor(title: string, tempalte: string, id?: string) {
        if (!id) {
            this.id = uuidv4()
        }
        else {
            this.id = id
        }
        this.title = title
        this.template = tempalte
    }
}