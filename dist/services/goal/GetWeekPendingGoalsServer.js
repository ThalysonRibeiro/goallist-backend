"use strict";
// import { startOfWeek, endOfWeek } from 'date-fns'
// import prismaClient from '../../prisma'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWeekPendingGoalsServer = void 0;
// interface GoalResponse {
//   id: string
//   title: string
//   desired_weekly_frequency: number
//   completionCount: number
// }
// class GetWeekPendingGoalsServer {
//   async execute(user_id: string): Promise<GoalResponse[]> {
//     const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
//     const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })
//     const goals = await prismaClient.goal.findMany({
//       where: {
//         user_id: user_id, // Adicione o filtro por usuário
//         created_at: {
//           lte: weekEnd
//         }
//       },
//       select: {
//         id: true,
//         title: true,
//         desired_weekly_frequency: true,
//         GoalCompletion: {
//           where: {
//             user_id: user_id, // Adicione o filtro por usuário também nas completions
//             created_at: {
//               gte: weekStart,
//               lte: weekEnd
//             }
//           }
//         }
//       }
//     })
//     const formattedGoals = goals.map(goal => ({
//       id: goal.id,
//       title: goal.title,
//       desired_weekly_frequency: goal.desired_weekly_frequency,
//       completionCount: goal.GoalCompletion.length
//     }))
//     return formattedGoals
//   }
// }
// export { GetWeekPendingGoalsServer }
// GetWeekPendingGoalsServer.ts
const date_fns_1 = require("date-fns");
const prisma_1 = __importDefault(require("../../prisma"));
class GetWeekPendingGoalsServer {
    async execute(user_id) {
        const weekStart = (0, date_fns_1.startOfWeek)(new Date(), { weekStartsOn: 1 });
        const weekEnd = (0, date_fns_1.endOfWeek)(new Date(), { weekStartsOn: 1 });
        const goals = await prisma_1.default.goal.findMany({
            where: {
                user_id: user_id,
                created_at: {
                    lte: weekEnd
                }
            },
            select: {
                id: true,
                title: true,
                desired_weekly_frequency: true,
                GoalCompletion: {
                    where: {
                        user_id: user_id,
                        created_at: {
                            gte: weekStart,
                            lte: weekEnd
                        }
                    }
                }
            }
        });
        const formattedGoals = goals.map(goal => ({
            id: goal.id,
            title: goal.title,
            desired_weekly_frequency: goal.desired_weekly_frequency,
            completionCount: goal.GoalCompletion.length
        }));
        return formattedGoals;
    }
}
exports.GetWeekPendingGoalsServer = GetWeekPendingGoalsServer;
