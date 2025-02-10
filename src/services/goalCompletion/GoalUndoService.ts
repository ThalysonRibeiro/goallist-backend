import prismaClient from "../../prisma";

class GoalUndoService {
  async execute(id: string) {
    await prismaClient.goalCompletion.delete({
      where: {
        id: id
      }
    });
  }
}

export { GoalUndoService };