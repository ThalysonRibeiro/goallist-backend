import { FastifyReply, FastifyRequest } from "fastify";
import { ChangeEmailService } from "../../services/user/ChangeEmailService";

class ChangeEmailController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { currentEmail, newEmail } = req.body as { currentEmail: string, newEmail: string };
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const changeEmailService = new ChangeEmailService();

    try {
      await changeEmailService.execute({ user_id, currentEmail, newEmail });
      return res.status(200).send({ message: 'Email updated successfully' });
    } catch (error: any) {
      if (error.message === 'E-mail atual incorreto') {
        return res.status(400).send({ message: error.message });
      } else if (error.message === 'O novo e-mail não pode ser igual ao antigo') {
        return res.status(400).send({ message: error.message });
      } else if (error.message === 'O novo e-mail já está em uso por outro usuário') {
        return res.status(409).send({ message: error.message });
      }

      return res.status(400).send(error)
    }
  }
}

export { ChangeEmailController };