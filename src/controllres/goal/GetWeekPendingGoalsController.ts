import { FastifyRequest, FastifyReply } from 'fastify'
import { GetWeekPendingGoalsServer } from '../../services/goal/GetWeekPendingGoalsServer'


class GetWeekPendingGoalsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const getPendingGoalsServer = new GetWeekPendingGoalsServer()

      const goals = await getPendingGoalsServer.execute()

      return res.send(goals)
    } catch (error) {
      return res.status(500).send({ error: 'Erro interno do servidor' })
    }
  }
}

export { GetWeekPendingGoalsController }