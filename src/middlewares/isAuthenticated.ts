import { FastifyReply, FastifyRequest } from "fastify";
import { verify, JwtPayload } from "jsonwebtoken"; // Importe JwtPayload para tipar o retorno

interface Payload extends JwtPayload {
  sub: string; // Certifique-se de que o campo "sub" está presente
}

export function isAuthenticated(
  req: FastifyRequest,
  res: FastifyReply,
  done: (err?: Error) => void // O Fastify espera a função done() ser chamada
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).send({ message: 'No token provided' });
  }

  const [, token] = authToken.split(' '); // Extrai o token da string "Bearer token"

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as Payload;

    if (!decoded || !decoded.sub) {
      return res.status(401).send({ message: 'Invalid token payload' });
    }

    // Atribui o ID do usuário ao objeto de requisição
    (req as any).user = { id: decoded.sub };

    // Chama done() para continuar a execução da rota
    done();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).send({ message: 'Invalid token' });
  }
}

// Extende a interface do FastifyRequest para incluir o campo "user"
declare module 'fastify' {
  interface FastifyRequest {
    user?: { id: string };
  }
}
