import { FastifyRequest, FastifyReply } from 'fastify'
import { GetWeekPendingGoalsServer } from '../../services/goal/GetWeekPendingGoalsServer'

class GetWeekPendingGoalsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      // Obtém o user_id do request que foi configurado pelo middleware
      const user_id = req.user?.id

      if (!user_id) {
        return res.status(401).send({ error: 'Usuário não autorizado' })
      }

      const getPendingGoalsServer = new GetWeekPendingGoalsServer()
      const goals = await getPendingGoalsServer.execute(user_id)

      return res.send(goals)
    } catch (error) {
      return res.status(500).send({ error: 'Erro interno do servidor' })
    }
  }
}

export { GetWeekPendingGoalsController }