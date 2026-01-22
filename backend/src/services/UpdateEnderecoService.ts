import { AppDataSource } from "../database/data-source";
import { Endereco } from "../entities/Endereco";

interface IRequest {
  endereco_id: number;
  user_id: number;
  rua?: string;
  numero?: string;
  cidade?: string;
  cep?: string;
}

export class UpdateEnderecoService {
  async execute({ endereco_id, user_id, rua, numero, cidade, cep }: IRequest) {
    const repo = AppDataSource.getRepository(Endereco);

    const endereco = await repo.findOne({ where: { id: endereco_id } });

    if (!endereco) {
      throw new Error("Endereço não encontrado");
    }

    if (endereco.usuario_id !== user_id) {
      throw new Error("Você não pode editar endereço de outro usuário");
    }

    if (rua !== undefined) endereco.rua = rua.trim();
    if (numero !== undefined) endereco.numero = String(numero).trim();
    if (cidade !== undefined) endereco.cidade = cidade.trim();
    if (cep !== undefined) endereco.cep = cep.trim();

    await repo.save(endereco);

    return endereco;
  }
}
