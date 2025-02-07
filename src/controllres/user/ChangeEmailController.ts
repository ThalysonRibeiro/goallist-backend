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
    } catch (error: unknown) {
      // Afirmação de tipo para garantir que o erro seja uma instância de Error
      if (error instanceof Error) {
        if (error.message === 'Current email incorrect') {
          return res.status(400).send({ statusCode: 400, error: 'Bad Request', message: error.message });
        } else if (error.message === 'User not found') {
          return res.status(404).send({ statusCode: 404, error: 'Not Found', message: error.message });
        } else if (error.message === 'Email already in use') {
          return res.status(409).send({ statusCode: 409, error: 'Conflict', message: error.message });
        }
      }

      // Registre o erro para depuração
      console.error('Unexpected error:', error);
      return res.status(500).send({ statusCode: 500, error: 'Internal Server Error', message: 'An unexpected error occurred' });
    }
  }
}

export { ChangeEmailController };