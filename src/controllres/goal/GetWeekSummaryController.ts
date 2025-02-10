import { FastifyReply, FastifyRequest } from 'fastify';
import { GetWeekSummaryService } from '../../services/goal/GetWeekSummaryService';

class GetWeekSummaryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user_id = request.user?.id;

      if (!user_id) {
        return reply.status(401).send({ error: 'Usuário não autorizado' });
      }

      const getWeekSummaryService = new GetWeekSummaryService();
      const result = await getWeekSummaryService.execute(user_id);

      return reply.send(result);
    } catch (error) {
      return reply.status(400).send({ error: 'Erro interno do servidor' });
    }
  }
}

export { GetWeekSummaryController };