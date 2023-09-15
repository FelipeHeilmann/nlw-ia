import { PromptController } from "../../api/controller/PromtController"
import { VideoController } from "../../api/controller/VideoController"
import { prisma } from "../../infra/database"
import { PromptRepositoryPrimsa } from "../repository/implementations/PromptRepositoryPrisma"
import { VideoRepositoryPrisma } from "../repository/implementations/VideoRepositoryPrisma"
import { PromptServices } from "./PromptServices"
import { VideoServices } from "./VideoServices"

const promptRepository = new PromptRepositoryPrimsa(prisma)
const videoRepository = new VideoRepositoryPrisma(prisma)

const promptServices = new PromptServices(promptRepository)
const videoServices = new VideoServices(videoRepository)

const promptController = new PromptController(promptServices)
const videoController = new VideoController(videoServices)

export { promptController, videoController }

