import { FastifyReply, FastifyRequest } from "fastify";
import { ChangeNameService } from "../../services/user/ChangeNameService";

class ChangeNameController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { name } = req.body as { name: string };
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const changeNameService = new ChangeNameService();

    const user = await changeNameService.execute({
      user_id,
      name,
    });
    return res.status(200).send({ message: 'Name updated successfully', user });
  }
}

export { ChangeNameController }