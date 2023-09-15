import { Video } from "../../domain/Video";

export interface IVideoRepository {
    save(video: Video): Promise<void>

    getById(id: string): Promise<Video>

    update(video: Video): Promise<void>
}