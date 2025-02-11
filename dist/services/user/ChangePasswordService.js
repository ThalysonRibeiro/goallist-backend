"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class ChangePasswordService {
    async execute({ user_id, currentPassword, newPassword }) {
        // Busca o usuário pelo ID
        const user = await prisma_1.default.user.findFirst({
            where: { id: user_id }
        });
        // Verifica se o usuário existe
        if (!user) {
            throw new Error('User not found');
        }
        // Compara a senha atual com a senha armazenada
        const passwordMatch = await (0, bcryptjs_1.compare)(currentPassword, user.password);
        //se a senha atual estiver incorreta
        if (!passwordMatch) {
            throw new Error('Senha atual incorreta');
        }
        // Verifica se a nova senha é igual à atual
        if (newPassword === currentPassword) {
            throw new Error('A nova senha não pode ser igual a antiga');
        }
        // Criptografa a nova senha
        const hashedPassword = await (0, bcryptjs_1.hash)(newPassword, 8);
        // Atualiza a senha do usuário no banco de dados
        await prisma_1.default.user.update({
            where: { id: user_id },
            data: { password: hashedPassword }
        });
    }
}
exports.ChangePasswordService = ChangePasswordService;
