"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCompletionService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GoalCompletionService {
    async execute({ user_id, goal_id }) {
        // Verificar se o usuário existe
        const user = await prisma_1.default.user.findFirst({
            where: { id: user_id }
        });
        if (!user) {
            throw new Error('User not found');
        }
        // Verificar se a meta existe e pertence ao usuário
        const goal = await prisma_1.default.goal.findFirst({
            where: {
                id: goal_id,
                user_id: user_id,
            },
        });
        if (!goal) {
            throw new Error('Meta not found or does not belong to user.');
        }
        // Contar o número de vezes que essa meta já foi concluída
        const completionCount = await prisma_1.default.goalCompletion.count({
            where: {
                goal_id: goal.id,
                user_id: user_id,
            },
        });
        // Verificar se o número de conclusões atingiu o desired_weekly_frequency
        if (completionCount >= goal.desired_weekly_frequency) {
            throw new Error('Completion limit reached for this week.');
        }
        // Criar o registro de conclusão da meta
        await prisma_1.default.goalCompletion.create({
            data: {
                goal_id: goal.id,
                user_id: user_id,
                created_at: new Date(), // Marcar a data de conclusão
            },
        });
        // Não retornar nada (204 No Content)
    }
}
exports.GoalCompletionService = GoalCompletionService;
