import { compare, hash } from "bcryptjs";
import prismaClient from "../../prisma";

class ChangePasswordService {
  async execute({ user_id, currentPassword, newPassword }: { user_id: string, currentPassword: string, newPassword: string }) {
    // Busca o usuário pelo ID
    const user = await prismaClient.user.findFirst({
      where: { id: user_id }
    });

    // Verifica se o usuário existe
    if (!user) {
      throw new Error('User not found');
    }
    // Compara a senha atual com a senha armazenada
    const passwordMatch = await compare(currentPassword, user.password);

    //se a senha atual estiver incorreta
    if (!passwordMatch) {
      throw new Error('Current password incorrect');
    }

    // Verifica se a nova senha é igual à atual
    if (newPassword === currentPassword) {
      throw new Error('the new password cannot be the same as the old one');
    }
    // Criptografa a nova senha
    const hashedPassword = await hash(newPassword, 8);

    // Atualiza a senha do usuário no banco de dados
    await prismaClient.user.update({
      where: { id: user_id },
      data: { password: hashedPassword }
    });
  }
}

export { ChangePasswordService };