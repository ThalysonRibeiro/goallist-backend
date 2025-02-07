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
      throw new Error('Current email incorrect');
    }

    // Verifica se o novo e-mail é igual ao e-mail atual
    if (newEmail === currentEmail) {
      throw new Error('the new email cannot be the same as the old one');
    }

    // Verifica se o novo e-mail já está em uso
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: { email: newEmail }
    });

    if (emailAlreadyExists) {
      throw new Error('The new email is already in use by another user');
    }

    // Atualiza o e-mail do usuário
    await prismaClient.user.update({
      where: { id: user_id },
      data: { email: newEmail }
    });

  }
}

export { ChangeEmailService };