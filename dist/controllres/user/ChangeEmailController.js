"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeEmailController = void 0;
const ChangeEmailService_1 = require("../../services/user/ChangeEmailService");
class ChangeEmailController {
    async handle(req, res) {
        const { currentEmail, newEmail } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        const changeEmailService = new ChangeEmailService_1.ChangeEmailService();
        try {
            await changeEmailService.execute({ user_id, currentEmail, newEmail });
            return res.status(200).send({ message: 'Email updated successfully' });
        }
        catch (error) {
            if (error.message === 'E-mail atual incorreto') {
                return res.status(400).send({ message: error.message });
            }
            else if (error.message === 'O novo e-mail não pode ser igual ao antigo') {
                return res.status(400).send({ message: error.message });
            }
            else if (error.message === 'O novo e-mail já está em uso por outro usuário') {
                return res.status(409).send({ message: error.message });
            }
            return res.status(400).send(error);
        }
    }
}
exports.ChangeEmailController = ChangeEmailController;
