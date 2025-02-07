import { FastifyReply, FastifyRequest } from 'fastify';
import { GetWeekSummaryService } from '../../services/goal/GetWeekSummaryService';

class GetWeekSummaryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getWeekSummaryService = new GetWeekSummaryService();
    const result = await getWeekSummaryService.execute();

    reply.send(result);
  }
}

export { GetWeekSummaryController };
