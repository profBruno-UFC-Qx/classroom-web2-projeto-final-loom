import { AppDataSource } from "../database/data-source";
import { Endereco } from "../entities/Endereco";

interface IRequest {
  endereco_id: number;
  user_id: number;
}

export class DeleteEnderecoService {
  async execute({ endereco_id, user_id }: IRequest) {
    const repo = AppDataSource.getRepository(Endereco);

    const endereco = await repo.findOne({ where: { id: endereco_id } });

    if (!endereco) {
      throw new Error("Endereço não encontrado");
    }

    if (endereco.usuario_id !== user_id) {
      throw new Error("Você não pode remover endereço de outro usuário");
    }

    await repo.remove(endereco);

    return { message: "Endereço removido com sucesso" };
  }
}
