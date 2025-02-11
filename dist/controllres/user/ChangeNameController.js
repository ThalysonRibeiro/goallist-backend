"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeNameController = void 0;
const ChangeNameService_1 = require("../../services/user/ChangeNameService");
class ChangeNameController {
    async handle(req, res) {
        const { name } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(401).send({ error: "Unauthorized" });
        }
        const changeNameService = new ChangeNameService_1.ChangeNameService();
        const user = await changeNameService.execute({
            user_id,
            name,
        });
        return res.status(200).send({ message: 'Name updated successfully', user });
    }
}
exports.ChangeNameController = ChangeNameController;
