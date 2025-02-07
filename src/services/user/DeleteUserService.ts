import prismaClient from "../../prisma";

class DeleteUserService {
  async execute(user_id: string) {

    await prismaClient.user.delete({
      where: {
        id: user_id
      }
    });
  }
}

export { DeleteUserService };