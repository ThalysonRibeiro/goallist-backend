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
    } catch (error: any) {

      if (error.message) {
        if (error.message === 'Senha atual incorreta') {
          return res.status(400).send({ message: error.message });
        } else if (error.message === 'Senha atual incorreta') {
          return res.status(404).send({ message: error.message });
        }
      }
      return res.status(400).send(error)
    }
  }
}

export { ChangePasswordController };