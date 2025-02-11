"use strict";
// import { FastifyReply, FastifyRequest } from "fastify";
// import { ChangePasswordService } from "../../services/user/ChangePasswordService";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordController = void 0;
const ChangePasswordService_1 = require("../../services/user/ChangePasswordService");
class ChangePasswordController {
    async handle(req, res) {
        const { currentPassword, newPassword } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        const changePasswordService = new ChangePasswordService_1.ChangePasswordService();
        try {
            await changePasswordService.execute({ user_id, currentPassword, newPassword });
            return res.status(200).send({ message: 'Password updated successfully' });
        }
        catch (error) {
            if (error.message) {
                if (error.message === 'Senha atual incorreta') {
                    return res.status(400).send({ message: error.message });
                }
                else if (error.message === 'Senha atual incorreta') {
                    return res.status(404).send({ message: error.message });
                }
            }
            return res.status(400).send(error);
        }
    }
}
exports.ChangePasswordController = ChangePasswordController;
