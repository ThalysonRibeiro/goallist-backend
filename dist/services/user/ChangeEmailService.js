"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeEmailService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ChangeEmailService {
    async execute({ user_id, currentEmail, newEmail }) {
        // Busca o usuário pelo ID
        const user = await prisma_1.default.user.findFirst({
            where: { id: user_id }
        });
        // Verifica se o usuário existe
        if (!user) {
            throw new Error('User not found');
        }
        // Verifica se o e-mail atual está correto
        if (user.email !== currentEmail) {
            throw new Error('E-mail atual incorreto');
        }
        // Verifica se o novo e-mail é igual ao e-mail atual
        if (newEmail === currentEmail) {
            throw new Error('o novo e-mail não pode ser igual ao antigo');
        }
        // Verifica se o novo e-mail já está em uso
        const emailAlreadyExists = await prisma_1.default.user.findFirst({
            where: { email: newEmail }
        });
        if (emailAlreadyExists) {
            throw new Error('O novo e-mail já está em uso por outro usuário');
        }
        // Atualiza o e-mail do usuário
        await prisma_1.default.user.update({
            where: { id: user_id },
            data: { email: newEmail }
        });
    }
}
exports.ChangeEmailService = ChangeEmailService;
