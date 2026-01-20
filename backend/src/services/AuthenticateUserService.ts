import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IRequest {
  email: string;
  senha: string;
}

export class AuthenticateUserService {
  async execute({ email, senha }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign(
      {
        id: user.id,
        tipo_usuario: user.tipo_usuario,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    const { senha: _, ...userSemSenha } = user;

    return {
      user: userSemSenha,
      token,
    };
  }
}
