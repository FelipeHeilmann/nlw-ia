import fastify from "fastify";
import { router } from "./api/routes/routes";
import { fastifyMultipart } from "@fastify/multipart";
import cors from '@fastify/cors'


const app = fastify()


app.register(fastifyMultipart, {
    limits: {
        fileSize: 1_048_576 * 25 //25mb
    }
})
app.register(cors, {
    origin: '*'
})
app.register(router)

app.listen({
    port: 3333
}).then(() => {
    console.log(`HTTP Server running`)
})