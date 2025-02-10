import prismaClient from "../../prisma";

class ChangeEmailService {
  async execute({ user_id, currentEmail, newEmail }: { user_id: string, currentEmail: string, newEmail: string }) {
    // Busca o usuário pelo ID
    const user = await prismaClient.user.findFirst({
      where: { id: user_id }
    });

    // Verifica se o usuário existe
    if (!user) {
      throw new Error('User not found');
    }

    // Verifica se o e-mail atual está correto
    if (user.email !== currentEmail) {
      throw new Error('E-mail atual incorreto');
    }

    // Verifica se o novo e-mail é igual ao e-mail atual
    if (newEmail === currentEmail) {
      throw new Error('o novo e-mail não pode ser igual ao antigo');
    }

    // Verifica se o novo e-mail já está em uso
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: { email: newEmail }
    });

    if (emailAlreadyExists) {
      throw new Error('O novo e-mail já está em uso por outro usuário');
    }

    // Atualiza o e-mail do usuário
    await prismaClient.user.update({
      where: { id: user_id },
      data: { email: newEmail }
    });

  }
}

export { ChangeEmailService };