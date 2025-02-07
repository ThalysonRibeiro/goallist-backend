import prismaClient from "../../prisma";

interface CreateGoalRequest {
  user_id: string
  title: string;
  desired_weekly_frequency: number;
}


class CreateGoalService {
  async execute({ user_id, title, desired_weekly_frequency }: CreateGoalRequest) {

    const user = await prismaClient.user.findFirst({
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

    const alreadyExistsTitle = await prismaClient.goal.findFirst({
      where: { title }
    })

    if (alreadyExistsTitle) {
      throw new Error("Title already in use choose another");
    }

    //quantas metas tem o usuario
    const counteGoal = await prismaClient.goal.count({
      where: {
        user_id: user_id,
      }
    });

    const createGoal = await prismaClient.goal.create({
      data: {
        user_id: user_id,
        title: title,
        desired_weekly_frequency: desired_weekly_frequency,
      }
    });

    return createGoal;


  }
}

export { CreateGoalService };