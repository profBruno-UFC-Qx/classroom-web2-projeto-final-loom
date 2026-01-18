import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  tipo_usuario?: "ADMIN" | "ARTESAO" | "CLIENTE";
}

export class CreateUserService {
  async execute({ nome, email, senha, tipo_usuario }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new Error("Email já cadastrado");
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    const user = userRepository.create({
      nome,
      email,
      senha: senhaHash,
      tipo_usuario: tipo_usuario ?? "CLIENTE",
    });

    await userRepository.save(user);

    // remove senha antes de retornar
    const { senha: _, ...userSemSenha } = user;

    return userSemSenha;
  }
}
