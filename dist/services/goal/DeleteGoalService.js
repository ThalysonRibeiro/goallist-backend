"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGoalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteGoalService {
    async execute(id) {
        await prisma_1.default.goal.delete({
            where: {
                id: id
            }
        });
    }
}
exports.DeleteGoalService = DeleteGoalService;
