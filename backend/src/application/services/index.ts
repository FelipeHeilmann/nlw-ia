import { PromptController } from "../../api/controller/PromtController"
import { prisma } from "../../infra/database"
import { PromptRepositoryPrimsa } from "../repository/implementations/PromptRepositoryPrisma"
import { PromptServices } from "./PromptServices"

const promptRepository = new PromptRepositoryPrimsa(prisma)

const promptServices = new PromptServices(promptRepository)

const promptController = new PromptController(promptServices)

export { promptController }

