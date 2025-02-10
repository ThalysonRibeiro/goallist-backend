import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteGoalService } from "../../services/goal/DeleteGoalService";


class DeleteGoalController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.body as { id: string };

    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const deleteGoalService = new DeleteGoalService();

    try {
      await deleteGoalService.execute(id)
    } catch (error) {
      console.log(error);
    }
  }
}

export { DeleteGoalController };