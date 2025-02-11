"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGoalController = void 0;
const CreateGoalService_1 = require("../../services/goal/CreateGoalService");
class CreateGoalController {
    async handle(req, res) {
        let { user_id, title, desired_weekly_frequency } = req.body;
        if (!user_id || !title || !desired_weekly_frequency) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
        const createGoalService = new CreateGoalService_1.CreateGoalService();
        try {
            const goal = await createGoalService.execute({
                user_id,
                title,
                desired_weekly_frequency,
            });
            return res.status(201).send(goal);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "Title already in use choose another" || error.message === "The desired weekly frequency cannot be greater than 7.") {
                    return res.status(400).send({ statusCode: 400, error: 'Bad Request', message: error.message });
                }
                else if (error.message === 'User not found') {
                    return res.status(404).send({ statusCode: 404, error: 'Not Found', message: error.message });
                }
                else if (error.message === 'Title already in use') {
                    return res.status(409).send({ statusCode: 409, error: 'Conflict', message: error.message });
                }
            }
            // Registre o erro para depuração
            console.error('Unexpected error:', error);
            return res.status(500).send({ statusCode: 500, error: 'Internal Server Error', message: 'An unexpected error occurred' });
        }
    }
}
exports.CreateGoalController = CreateGoalController;
