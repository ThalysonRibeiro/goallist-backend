import { FastifyReply, FastifyRequest } from "fastify";
import { GoalCompletionService } from "../../services/goal/GoalCompletionService";

class GoalCompletionController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    // Usar encadeamento opcional para evitar erro se req.user não existir
    const user_id = req.user?.id;
    const { goal_id } = req.body as { goal_id: string };

    // Verificar se o user_id está presente
    if (!user_id) {
      return res.status(401).send({ message: 'Unauthenticated user' });
    }

    const goalCompletionService = new GoalCompletionService();

    try {
      // Passar user_id obtido do middleware e goal_id do corpo da requisição
      await goalCompletionService.execute({ user_id, goal_id });
      return res.status(204).send(); // Retornar status 204 (Sem conteúdo) ao concluir a meta
    } catch (error) {
      return res.status(400).send({ message: "goal already conpleted this week!" });
    }
  }
}

export { GoalCompletionController };
