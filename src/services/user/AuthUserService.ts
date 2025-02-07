import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";


interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      }
    });

    //se não tiver um usuario com esse email
    if (!user) {
      throw new Error("Email/password concerrect");
    }

    //desincripta a senha 
    const passwordMath = await compare(password, user.password);

    //se o usuario não tiver essa senha
    if (!passwordMath) {
      throw new Error("Email/password concerrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    )

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: token,
    }

  }
}

export { AuthUserService }