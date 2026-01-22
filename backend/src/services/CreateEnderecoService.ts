import { AppDataSource } from "../database/data-source";
import { Endereco } from "../entities/Endereco";

interface IRequest {
  user_id: number;
  rua: string;
  numero: string;
  cidade: string;
  cep: string;
}

export class CreateEnderecoService {
  async execute({ user_id, rua, numero, cidade, cep }: IRequest) {
    if (!rua || !numero || !cidade || !cep) {
      throw new Error("Preencha rua, numero, cidade e cep");
    }

    const repo = AppDataSource.getRepository(Endereco);

    const endereco = repo.create({
      usuario_id: user_id,
      rua: rua.trim(),
      numero: String(numero).trim(),
      cidade: cidade.trim(),
      cep: cep.trim(),
    });

    await repo.save(endereco);

    return endereco;
  }
}
