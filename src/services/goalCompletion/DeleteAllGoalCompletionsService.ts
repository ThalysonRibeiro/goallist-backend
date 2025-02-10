import prismaClient from "../../prisma";

class DeleteAllGoalCompletionsService {
  async execute() {
    await prismaClient.goalCompletion.deleteMany();
  }
}

export { DeleteAllGoalCompletionsService };