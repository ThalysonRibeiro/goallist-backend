import Fastify from "fastify";
import { appRoutes } from "../routes/routes";
import fastifyCors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

app.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN,
})

app.register(appRoutes);

const PORT = Number(process.env.PORT)

app.listen({
  port: PORT,
}).then(() => {
  console.log(`HTTP server running on port ${PORT}`);
}).catch(err => {
  console.error("Error starting server:", err);
});