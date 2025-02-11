"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalUndoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GoalUndoService {
    async execute(id) {
        await prisma_1.default.goalCompletion.delete({
            where: {
                id: id
            }
        });
    }
}
exports.GoalUndoService = GoalUndoService;
