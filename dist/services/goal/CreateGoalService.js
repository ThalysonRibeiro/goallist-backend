"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGoalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateGoalService {
    async execute({ user_id, title, desired_weekly_frequency }) {
        const user = await prisma_1.default.user.findFirst({
            where: { id: user_id }
        });
        if (!user) {
            throw new Error('User not found');
        }
        if (!title || !desired_weekly_frequency) {
            throw new Error("Error");
        }
        if (desired_weekly_frequency > 7) {
            throw new Error("The desired weekly frequency cannot be greater than 7.");
        }
        const alreadyExistsTitle = await prisma_1.default.goal.findFirst({
            where: { title }
        });
        if (alreadyExistsTitle) {
            throw new Error("Title already in use choose another");
        }
        //quantas metas tem o usuario
        const counteGoal = await prisma_1.default.goal.count({
            where: {
                user_id: user_id,
            }
        });
        const createGoal = await prisma_1.default.goal.create({
            data: {
                user_id: user_id,
                title: title,
                desired_weekly_frequency: desired_weekly_frequency,
            }
        });
        return createGoal;
    }
}
exports.CreateGoalService = CreateGoalService;
