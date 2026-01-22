import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

export class DeleteUserMeService {
  async execute(user_id: number) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id: user_id } });
    if (!user) throw new Error("Usuário não encontrado");

    await repo.remove(user);

    return { message: "Conta removida com sucesso" };
  }
}
