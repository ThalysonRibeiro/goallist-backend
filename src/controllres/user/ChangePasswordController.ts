// import { FastifyReply, FastifyRequest } from "fastify";
// import { ChangePasswordService } from "../../services/user/ChangePasswordService";


// class ChangePasswordController {
//   async handle(req: FastifyRequest, res: FastifyReply) {
//     const { currentPassword, newPassword } = req.body as { currentPassword: string, newPassword: string };
//     const user_id = req.user?.id;

//     if (!user_id) {
//       return res.status(401).send({ error: 'Unauthorized' });
//     }

//     const changePasswordService = new ChangePasswordService();
//     await changePasswordService.execute({ user_id, currentPassword, newPassword });

//     return res.status(200).send({ message: 'Password updated successfully' });
//   }
// }

// export { ChangePasswordController };

import { FastifyReply, FastifyRequest } from "fastify";
import { ChangePasswordService } from "../../services/user/ChangePasswordService";

class ChangePasswordController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { currentPassword, newPassword } = req.body as { currentPassword: string, newPassword: string };
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const changePasswordService = new ChangePasswordService();

    try {
      await changePasswordService.execute({ user_id, currentPassword, newPassword });
      return res.status(200).send({ message: 'Password updated successfully' });
    } catch (error: unknown) {
      // Afirmação de tipo para garantir que o erro seja uma instância de Error
      if (error instanceof Error) {
        if (error.message === 'Current password incorrect') {
          return res.status(400).send({ statusCode: 400, error: 'Bad Request', message: error.message });
        } else if (error.message === 'User not found') {
          return res.status(404).send({ statusCode: 404, error: 'Not Found', message: error.message });
        }
      }

      // Registre o erro para depuração
      console.error('Unexpected error:', error);
      return res.status(500).send({ statusCode: 500, error: 'Internal Server Error', message: 'An unexpected error occurred' });
    }
  }
}

export { ChangePasswordController };