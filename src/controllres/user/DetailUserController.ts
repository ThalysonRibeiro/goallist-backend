import { FastifyReply, FastifyRequest } from "fastify";
import { DetailUserService } from "../../services/user/DetailUserService";


class DetailUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const detailUserService = new DetailUserService();
    const detailUser = await detailUserService.execute(user_id);

    return res.send(detailUser);
  }
}

export { DetailUserController };