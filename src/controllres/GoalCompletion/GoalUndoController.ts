import { FastifyReply, FastifyRequest } from "fastify";
import { GoalUndoService } from "../../services/goalCompletion/GoalUndoService";

class GoalUndoController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.body as { id: string };

    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const goalUndoService = new GoalUndoService();

    try {
      await goalUndoService.execute(id)
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "error undo" });
    }
  }
}

export { GoalUndoController };