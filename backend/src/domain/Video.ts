import { v4 as uuidv4 } from "uuid";

export class Video {
    public id: string
    public name: string
    public path: string
    public transcription?: string | null
    public createdAt: Date

    constructor(name, path, transcription: string | null, id?: string) {
        this.name = name
        this.path = path
        this.transcription = transcription
        if (!id) {
            this.id = uuidv4()
        }
        else {
            this.id = id
        }

    }
}