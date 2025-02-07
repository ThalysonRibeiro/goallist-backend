import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {

    const user_id = req.user?.id;
    // console.log('User ID from request:', user_id);

    if (!user_id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const deleteUserService = new DeleteUserService();

    try {
      await deleteUserService.execute(user_id);
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export { DeleteUserController };