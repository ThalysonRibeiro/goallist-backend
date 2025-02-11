import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteAllGoalCompletionsService } from "../../services/goalCompletion/DeleteAllGoalCompletionsService";


class DeleteAllGoalCompletionsController {
  async handle(req: FastifyRequest, res: FastifyReply) {

    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const deleteAllGoalCompletionsService = new DeleteAllGoalCompletionsService();

    try {
      await deleteAllGoalCompletionsService.execute();

      return res.status(200).send({ message: "All goal completions deleted successfully" });
    } catch (error) {
      return res.status(400).send({ message: "error delete" });
    }

  }
}
export { DeleteAllGoalCompletionsController };