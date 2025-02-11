"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeNameService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ChangeNameService {
    async execute({ user_id, name }) {
        try {
            const userAlreadyExiste = await prisma_1.default.user.findFirst({
                where: {
                    id: user_id,
                }
            });
            if (!userAlreadyExiste) {
                throw new Error("User not existe!");
            }
            const userUpdateName = await prisma_1.default.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    name,
                },
                select: {
                    name: true,
                    email: true,
                }
            });
            return userUpdateName;
        }
        catch (error) {
            throw new Error("Error an update the user");
        }
    }
}
exports.ChangeNameService = ChangeNameService;
