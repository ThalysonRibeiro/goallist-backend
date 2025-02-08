import { FastifyReply, FastifyRequest } from "fastify";
import { AuthUserService } from "../../services/user/AuthUserService";

interface SessionUserBody {
  email: string;
  password: string;
}

class AuthUserController {
  async handle(req: FastifyRequest<{ Body: SessionUserBody }>, res: FastifyReply) {
    let { email, password } = req.body;

    //validação basica
    if (!email || !password) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    //conveter email pra minúsculas
    email = email.toLowerCase();

    const authService = new AuthUserService();

    const session = await authService.execute({
      email,
      password,
    });

    return res.status(200).send(session);

  }
}

export { AuthUserController }