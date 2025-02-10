import prismaClient from "../../prisma";

class DeleteGoalService {
  async execute(id: string) {
    await prismaClient.goal.delete({
      where: {
        id: id
      }
    })
  }
}

export { DeleteGoalService };