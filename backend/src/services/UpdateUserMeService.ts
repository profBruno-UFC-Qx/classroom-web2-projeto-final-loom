import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

interface IRequest {
  user_id: number;
  nome?: string;
  email?: string;
  senha?: string;
}

export class UpdateUserMeService {
  async execute({ user_id, nome, email, senha }: IRequest) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id: user_id } });
    if (!user) throw new Error("Usuário não encontrado");

    if (email && email !== user.email) {
      const exists = await repo.findOne({ where: { email } });
      if (exists) throw new Error("E-mail já está em uso");
      user.email = email;
    }

    if (nome !== undefined) user.nome = nome;

    // se mandar senha, atualiza com hash
    if (senha) {
      if (senha.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres");
      user.senha = await bcrypt.hash(senha, 8);
    }

    await repo.save(user);

    const { senha: _, ...rest }: any = user;
    return rest;
  }
}
