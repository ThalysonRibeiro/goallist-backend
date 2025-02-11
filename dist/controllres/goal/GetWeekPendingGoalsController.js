"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWeekPendingGoalsController = void 0;
const GetWeekPendingGoalsServer_1 = require("../../services/goal/GetWeekPendingGoalsServer");
class GetWeekPendingGoalsController {
    async handle(req, res) {
        try {
            // Obtém o user_id do request que foi configurado pelo middleware
            const user_id = req.user?.id;
            if (!user_id) {
                return res.status(401).send({ error: 'Usuário não autorizado' });
            }
            const getPendingGoalsServer = new GetWeekPendingGoalsServer_1.GetWeekPendingGoalsServer();
            const goals = await getPendingGoalsServer.execute(user_id);
            return res.send(goals);
        }
        catch (error) {
            return res.status(400).send({ error: 'Erro interno do servidor' });
        }
    }
}
exports.GetWeekPendingGoalsController = GetWeekPendingGoalsController;
