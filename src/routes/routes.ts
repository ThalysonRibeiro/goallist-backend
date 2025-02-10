import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllres/user/CreateUserController";
import { AuthUserController } from "../controllres/user/AuthUserController";
import { DetailUserController } from "../controllres/user/DetailUserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ChangePasswordController } from "../controllres/user/ChangePasswordController";
import { ChangeEmailController } from "../controllres/user/ChangeEmailController";
import { ChangeNameController } from "../controllres/user/ChangeNameController";
import { DeleteUserController } from "../controllres/user/DeleteUserController";
import { CreateGoalController } from "../controllres/goal/CreateGoalController";
import { GetWeekPendingGoalsController } from "../controllres/goal/GetWeekPendingGoalsController";
import { GoalCompletionController } from "../controllres/goal/GoalCompletionController";
import { GetWeekSummaryController } from "../controllres/goal/GetWeekSummaryController";
import { GoalUndoController } from "../controllres/GoalCompletion/GoalUndoController";
import { DeleteGoalController } from "../controllres/goal/DeleteGoalController";
import { DeleteAllGoalCompletionsController } from "../controllres/GoalCompletion/DeleteAllGoalCompletionsController";


export async function appRoutes(fastify: FastifyInstance) {

  // Rota de test para verificar se o servidor está online
  fastify.get('/test', (req, res) => {
    return res.status(200).send({ ok: true });
  });

  //Rota de criação de usuário
  fastify.post('/users', new CreateUserController().handle);
  //rotalogin usuario
  fastify.post('/session', new AuthUserController().handle);
  //rota detalhes do usuario
  fastify.get('/me', { preHandler: isAuthenticated }, new DetailUserController().handle);
  //rota atualizar senha
  fastify.put('/change-password', { preHandler: isAuthenticated }, new ChangePasswordController().handle);
  //rota atualizar email
  fastify.put('/change-email', { preHandler: isAuthenticated }, new ChangeEmailController().handle);
  //rota atualizar nome
  fastify.put('/change-name', { preHandler: isAuthenticated }, new ChangeNameController().handle);
  //rota deletar usuario
  fastify.delete('/delete-user', { preHandler: isAuthenticated }, new DeleteUserController().handle);


  //rota goal
  fastify.post('/goals', { preHandler: isAuthenticated }, new CreateGoalController().handle);
  fastify.get('/pending-goals', { preHandler: isAuthenticated }, new GetWeekPendingGoalsController().handle);
  fastify.post('/completions', { preHandler: isAuthenticated }, new GoalCompletionController().handle);
  fastify.get('/summary', { preHandler: isAuthenticated }, new GetWeekSummaryController().handle);
  fastify.delete('/delete-goal', { preHandler: isAuthenticated }, new DeleteGoalController().handle);
  fastify.delete('/delete-all-goal-completion', { preHandler: isAuthenticated }, new DeleteAllGoalCompletionsController().handle);

  //rota goalcompletion
  fastify.delete('/undo', { preHandler: isAuthenticated }, new GoalUndoController().handle);
}