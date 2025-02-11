"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGoalController = void 0;
const DeleteGoalService_1 = require("../../services/goal/DeleteGoalService");
class DeleteGoalController {
    async handle(req, res) {
        const { id } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(401).send({ error: "Unauthorized" });
        }
        const deleteGoalService = new DeleteGoalService_1.DeleteGoalService();
        try {
            await deleteGoalService.execute(id);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.DeleteGoalController = DeleteGoalController;
