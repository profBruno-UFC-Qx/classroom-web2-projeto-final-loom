import { AppDataSource } from "../database/data-source";
import { Categoria } from "../entities/Categoria";

interface IRequest {
  nome: string;
}

export class CreateCategoriaService {
  async execute({ nome }: IRequest) {
    if (!nome || !nome.trim()) {
      throw new Error("Nome da categoria é obrigatório");
    }

    const repo = AppDataSource.getRepository(Categoria);

    const exists = await repo.findOne({ where: { nome: nome.trim() } });
    if (exists) {
      throw new Error("Já existe uma categoria com esse nome");
    }

    const categoria = repo.create({ nome: nome.trim() });
    await repo.save(categoria);

    return categoria;
  }
}
