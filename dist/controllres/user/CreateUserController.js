"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    async handle(req, res) {
        let { name, email, password } = req.body;
        //validação básica
        if (!name || !email || !password) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        // Converter o email para minúsculas
        email = email.toLowerCase();
        //Converter o nome para capitalizado ou outro formato
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const createUserService = new CreateUserService_1.CreateUserService();
        const user = await createUserService.execute({
            name,
            email,
            password,
        });
        return res.status(201).send({ message: "user created successfully!", user });
    }
}
exports.CreateUserController = CreateUserController;
