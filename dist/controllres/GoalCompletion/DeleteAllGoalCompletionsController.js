"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllGoalCompletionsController = void 0;
const DeleteAllGoalCompletionsService_1 = require("../../services/goalCompletion/DeleteAllGoalCompletionsService");
class DeleteAllGoalCompletionsController {
    async handle(req, res) {
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(401).send({ error: "Unauthorized" });
        }
        const deleteAllGoalCompletionsService = new DeleteAllGoalCompletionsService_1.DeleteAllGoalCompletionsService();
        try {
            await deleteAllGoalCompletionsService.execute();
            return res.status(200).send({ message: "All goal completions deleted successfully" });
        }
        catch (error) {
            return res.status(400).send({ message: "error delete" });
        }
    }
}
exports.DeleteAllGoalCompletionsController = DeleteAllGoalCompletionsController;
