import { PrismaClient } from '@prisma/client';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const prisma = new PrismaClient();

class GetWeekSummaryService {
  async execute(user_id: string) { // Adicione o parâmetro user_id
    const currentDate = new Date();
    const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const lastDayOfWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    // Adicione o filtro user_id na consulta de goals
    const goalsCreatedUpToWeek = await prisma.goal.findMany({
      where: {
        user_id: user_id, // Adicione este filtro
        created_at: {
          lte: lastDayOfWeek,
        },
      },
      select: {
        id: true,
        title: true,
        desired_weekly_frequency: true,
        created_at: true,
      },
    });

    // Adicione o filtro user_id na consulta de goalCompletions
    const goalsCompletedInWeek = await prisma.goalCompletion.findMany({
      where: {
        user_id: user_id, // Adicione este filtro
        created_at: {
          gte: firstDayOfWeek,
          lte: lastDayOfWeek,
        },
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

    // O resto do código permanece igual
    const goalsCompletedByWeekDay: Record<string, any[]> = {};

    goalsCompletedInWeek.forEach((completion) => {
      const completedAtDate = completion.created_at ? format(completion.created_at, 'yyyy-MM-dd') : null;

      if (completedAtDate) {
        if (!goalsCompletedByWeekDay[completedAtDate]) {
          goalsCompletedByWeekDay[completedAtDate] = [];
        }
        goalsCompletedByWeekDay[completedAtDate].push({
          id: completion.id,
          title: completion.goal.title,
          completedAt: completion.created_at,

          // id: completion.goal.id,
          // title: completion.goal.title,
          // completedAt: completion.created_at,
        });
      }
    });

    const completedCount = goalsCompletedInWeek.length;
    const totalDesiredFrequency = goalsCreatedUpToWeek.reduce(
      (sum, goal) => sum + goal.desired_weekly_frequency,
      0
    );

    return {
      summary: {
        completed: completedCount,
        total: totalDesiredFrequency,
        goalsPerDay: goalsCompletedByWeekDay,
      },
    };
  }
}

export { GetWeekSummaryService };