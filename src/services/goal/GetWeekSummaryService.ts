import { PrismaClient } from '@prisma/client';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const prisma = new PrismaClient();

class GetWeekSummaryService {
  async execute() {
    // Data atual
    const currentDate = new Date();

    // Primeira e última data da semana
    const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });  // Começando a semana na segunda-feira
    const lastDayOfWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    // Consulta dos objetivos criados até o fim da semana
    const goalsCreatedUpToWeek = await prisma.goal.findMany({
      where: {
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

    // Consulta de metas completadas na semana
    const goalsCompletedInWeek = await prisma.goalCompletion.findMany({
      where: {
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
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Agrupar completions por data
    const goalsCompletedByWeekDay: Record<string, any[]> = {};

    goalsCompletedInWeek.forEach((completion) => {
      const completedAtDate = completion.created_at ? format(completion.created_at, 'yyyy-MM-dd') : null;

      if (completedAtDate) {
        if (!goalsCompletedByWeekDay[completedAtDate]) {
          goalsCompletedByWeekDay[completedAtDate] = [];
        }
        goalsCompletedByWeekDay[completedAtDate].push({
          id: completion.goal.id,
          title: completion.goal.title,
          completedAt: completion.created_at,
        });
      }
    });

    // Resumo final
    const completedCount = goalsCompletedInWeek.length;
    const totalDesiredFrequency = goalsCreatedUpToWeek.reduce(
      (sum, goal) => sum + goal.desired_weekly_frequency,
      0
    );

    return {
      summary: [
        {
          completed: completedCount,
          total: totalDesiredFrequency,
          goalsPerDay: goalsCompletedByWeekDay,
        },
      ],
    };
  }
}

export { GetWeekSummaryService };
