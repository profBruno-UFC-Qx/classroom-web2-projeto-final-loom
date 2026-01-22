import { AppDataSource } from "../database/data-source";
import { Endereco } from "../entities/Endereco";

export class ListMeEnderecosService {
  async execute(user_id: number) {
    const repo = AppDataSource.getRepository(Endereco);

    return repo.find({
      where: { usuario_id: user_id },
      order: { id: "DESC" as any },
    });
  }
}
