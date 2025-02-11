"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalUndoController = void 0;
const GoalUndoService_1 = require("../../services/goalCompletion/GoalUndoService");
class GoalUndoController {
    async handle(req, res) {
        const { id } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(401).send({ error: "Unauthorized" });
        }
        const goalUndoService = new GoalUndoService_1.GoalUndoService();
        try {
            await goalUndoService.execute(id);
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ message: "error undo" });
        }
    }
}
exports.GoalUndoController = GoalUndoController;
