"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllGoalCompletionsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteAllGoalCompletionsService {
    async execute() {
        await prisma_1.default.goalCompletion.deleteMany();
    }
}
exports.DeleteAllGoalCompletionsService = DeleteAllGoalCompletionsService;
