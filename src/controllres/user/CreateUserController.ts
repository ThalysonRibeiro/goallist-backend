import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../../services/user/CreateUserService";

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

class CreateUserController {
  async handle(req: FastifyRequest<{ Body: CreateUserBody }>, res: FastifyReply) {
    let { name, email, password } = req.body;

    //validação básica
    if (!name || !email || !password) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Converter o email para minúsculas
    email = email.toLowerCase();

    //Converter o nome para capitalizado ou outro formato
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(201).send({ message: "user created successfully!", user });
  }
}

export { CreateUserController };