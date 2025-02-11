"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = appRoutes;
const CreateUserController_1 = require("../controllres/user/CreateUserController");
const AuthUserController_1 = require("../controllres/user/AuthUserController");
const DetailUserController_1 = require("../controllres/user/DetailUserController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const ChangePasswordController_1 = require("../controllres/user/ChangePasswordController");
const ChangeEmailController_1 = require("../controllres/user/ChangeEmailController");
const ChangeNameController_1 = require("../controllres/user/ChangeNameController");
const DeleteUserController_1 = require("../controllres/user/DeleteUserController");
const CreateGoalController_1 = require("../controllres/goal/CreateGoalController");
const GetWeekPendingGoalsController_1 = require("../controllres/goal/GetWeekPendingGoalsController");
const GoalCompletionController_1 = require("../controllres/goal/GoalCompletionController");
const GetWeekSummaryController_1 = require("../controllres/goal/GetWeekSummaryController");
const GoalUndoController_1 = require("../controllres/GoalCompletion/GoalUndoController");
const DeleteGoalController_1 = require("../controllres/goal/DeleteGoalController");
const DeleteAllGoalCompletionsController_1 = require("../controllres/GoalCompletion/DeleteAllGoalCompletionsController");
async function appRoutes(fastify) {
    // Rota de test para verificar se o servidor está online
    fastify.get('/test', (req, res) => {
        return res.status(200).send({ ok: true });
    });
    //Rota de criação de usuário
    fastify.post('/users', new CreateUserController_1.CreateUserController().handle);
    //rotalogin usuario
    fastify.post('/session', new AuthUserController_1.AuthUserController().handle);
    //rota detalhes do usuario
    fastify.get('/me', { preHandler: isAuthenticated_1.isAuthenticated }, new DetailUserController_1.DetailUserController().handle);
    //rota atualizar senha
    fastify.put('/change-password', { preHandler: isAuthenticated_1.isAuthenticated }, new ChangePasswordController_1.ChangePasswordController().handle);
    //rota atualizar email
    fastify.put('/change-email', { preHandler: isAuthenticated_1.isAuthenticated }, new ChangeEmailController_1.ChangeEmailController().handle);
    //rota atualizar nome
    fastify.put('/change-name', { preHandler: isAuthenticated_1.isAuthenticated }, new ChangeNameController_1.ChangeNameController().handle);
    //rota deletar usuario
    fastify.delete('/delete-user', { preHandler: isAuthenticated_1.isAuthenticated }, new DeleteUserController_1.DeleteUserController().handle);
    //rota goal
    fastify.post('/goals', { preHandler: isAuthenticated_1.isAuthenticated }, new CreateGoalController_1.CreateGoalController().handle);
    fastify.get('/pending-goals', { preHandler: isAuthenticated_1.isAuthenticated }, new GetWeekPendingGoalsController_1.GetWeekPendingGoalsController().handle);
    fastify.post('/completions', { preHandler: isAuthenticated_1.isAuthenticated }, new GoalCompletionController_1.GoalCompletionController().handle);
    fastify.get('/summary', { preHandler: isAuthenticated_1.isAuthenticated }, new GetWeekSummaryController_1.GetWeekSummaryController().handle);
    fastify.delete('/delete-goal', { preHandler: isAuthenticated_1.isAuthenticated }, new DeleteGoalController_1.DeleteGoalController().handle);
    fastify.delete('/delete-all-goal-completion', { preHandler: isAuthenticated_1.isAuthenticated }, new DeleteAllGoalCompletionsController_1.DeleteAllGoalCompletionsController().handle);
    //rota goalcompletion
    fastify.delete('/undo', { preHandler: isAuthenticated_1.isAuthenticated }, new GoalUndoController_1.GoalUndoController().handle);
}
