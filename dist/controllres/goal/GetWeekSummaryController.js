"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWeekSummaryController = void 0;
const GetWeekSummaryService_1 = require("../../services/goal/GetWeekSummaryService");
class GetWeekSummaryController {
    async handle(request, reply) {
        try {
            const user_id = request.user?.id;
            if (!user_id) {
                return reply.status(401).send({ error: 'Usuário não autorizado' });
            }
            const getWeekSummaryService = new GetWeekSummaryService_1.GetWeekSummaryService();
            const result = await getWeekSummaryService.execute(user_id);
            return reply.send(result);
        }
        catch (error) {
            return reply.status(400).send({ error: 'Erro interno do servidor' });
        }
    }
}
exports.GetWeekSummaryController = GetWeekSummaryController;
