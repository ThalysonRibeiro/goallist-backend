
// import { startOfWeek, endOfWeek } from 'date-fns'
// import prismaClient from '../../prisma'

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
import { startOfWeek, endOfWeek } from 'date-fns'
import prismaClient from '../../prisma'

interface GoalResponse {
  id: string
  title: string
  desired_weekly_frequency: number
  completionCount: number
}

class GetWeekPendingGoalsServer {
  async execute(user_id: string): Promise<GoalResponse[]> {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

    const goals = await prismaClient.goal.findMany({
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
    })

    const formattedGoals = goals.map(goal => ({
      id: goal.id,
      title: goal.title,
      desired_weekly_frequency: goal.desired_weekly_frequency,
      completionCount: goal.GoalCompletion.length
    }))

    return formattedGoals

  }
}

export { GetWeekPendingGoalsServer }