"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/user/AuthUserService");
class AuthUserController {
    async handle(req, res) {
        let { email, password } = req.body;
        //validação basica
        if (!email || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        //conveter email pra minúsculas
        email = email.toLowerCase();
        const authService = new AuthUserService_1.AuthUserService();
        const session = await authService.execute({
            email,
            password,
        });
        return res.status(200).send(session);
    }
}
exports.AuthUserController = AuthUserController;
