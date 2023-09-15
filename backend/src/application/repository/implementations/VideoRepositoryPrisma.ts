import { PrismaClient } from "@prisma/client";
import { Video } from "../../../domain/Video";
import { IVideoRepository } from "../IVideoRepository";

export class VideoRepositoryPrisma implements IVideoRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async update(video: Video): Promise<void> {
        await this.prisma.video.update({
            where: {
                id: video.id
            },
            data: {
                name: video.name,
                path: video.path,
                transcription: video.transcription
            }
        })
    }
    async getById(id: string): Promise<Video> {
        return await this.prisma.video.findFirstOrThrow({
            where: {
                id
            }
        })
    }
    async save(video: Video): Promise<void> {
        await this.prisma.video.create({
            data: {
                id: video.id,
                name: video.name,
                path: video.path,
                createdAt: video.createdAt,
                transcription: video.transcription
            }
        })
    }


}