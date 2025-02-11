"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        //se não tiver um usuario com esse email
        if (!user) {
            throw new Error("E-mail ou senha incorretos");
        }
        //desincripta a senha 
        const passwordMath = await (0, bcryptjs_1.compare)(password, user.password);
        //se o usuario não tiver essa senha
        if (!passwordMath) {
            throw new Error("E-mail ou senha incorretos");
        }
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "30d",
        });
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            token: token,
        };
    }
}
exports.AuthUserService = AuthUserService;
