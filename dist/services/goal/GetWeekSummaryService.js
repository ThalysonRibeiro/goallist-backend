"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWeekSummaryService = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
class GetWeekSummaryService {
    async execute(user_id) {
        // Busca todos os goals do usuário
        const allGoals = await prisma.goal.findMany({
            where: {
                user_id: user_id,
            },
            select: {
                id: true,
                title: true,
                desired_weekly_frequency: true,
                created_at: true,
            },
        });
        // Busca todas as completions do usuário
        const allCompletions = await prisma.goalCompletion.findMany({
            where: {
                user_id: user_id,
            },
            include: {
                goal: {
                    select: {
                        id: true,
                        title: true,
                        GoalCompletion: true
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        const goalsCompletedByWeekDay = {};
        let totalCompleted = 0;
        // Agrupa todas as completions por dia
        allCompletions.forEach((completion) => {
            const completedAtDate = completion.created_at ? (0, date_fns_1.format)(completion.created_at, 'yyyy-MM-dd') : null;
            if (completedAtDate) {
                if (!goalsCompletedByWeekDay[completedAtDate]) {
                    goalsCompletedByWeekDay[completedAtDate] = [];
                }
                goalsCompletedByWeekDay[completedAtDate].push({
                    id: completion.id,
                    title: completion.goal.title,
                    completedAt: completion.created_at,
                });
                totalCompleted++;
            }
        });
        // Calcula o total de frequência desejada somando todos os goals
        const totalDesiredFrequency = allGoals.reduce((sum, goal) => sum + goal.desired_weekly_frequency, 0);
        return {
            summary: {
                completed: totalCompleted,
                total: totalDesiredFrequency,
                goalsPerDay: goalsCompletedByWeekDay,
            },
        };
    }
}
exports.GetWeekSummaryService = GetWeekSummaryService;
