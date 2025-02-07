import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
}

class ChangeNameService {
  async execute({ user_id, name }: UserRequest) {

    try {
      const userAlreadyExiste = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        }
      })

      if (!userAlreadyExiste) {
        throw new Error("User not existe!");
      }

      const userUpdateName = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
        },
        select: {
          name: true,
          email: true,
        }
      });

      return userAlreadyExiste;

    } catch (error) {
      throw new Error("Error an update the user");
    }

  }
}

export { ChangeNameService };