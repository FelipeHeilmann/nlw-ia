import fastify from "fastify";
import { router } from "./api/routes/routes";

const app = fastify()

app.listen({
    port: 3333
}).then(() => {
    console.log(`HTTP Server running`)
})

router(app)