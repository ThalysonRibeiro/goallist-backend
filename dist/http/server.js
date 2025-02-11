"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("../routes/routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(cors_1.default, {
    origin: process.env.CORS_ORIGIN,
});
app.register(routes_1.appRoutes);
const PORT = Number(process.env.PORT);
app.listen({
    port: PORT,
}).then(() => {
    console.log(`HTTP server running on port ${PORT}`);
}).catch(err => {
    console.error("Error starting server:", err);
});
