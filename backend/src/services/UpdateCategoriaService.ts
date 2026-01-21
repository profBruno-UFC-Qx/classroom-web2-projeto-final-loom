import { AppDataSource } from "../database/data-source";
import { Categoria } from "../entities/Categoria";

interface IRequest {
  id: number;
  nome: string;
}

export class UpdateCategoriaService {
  async execute({ id, nome }: IRequest) {
    if (!nome || !nome.trim()) {
      throw new Error("Nome da categoria é obrigatório");
    }

    const repo = AppDataSource.getRepository(Categoria);

    const categoria = await repo.findOne({ where: { id } });
    if (!categoria) throw new Error("Categoria não encontrada");

    const exists = await repo.findOne({ where: { nome: nome.trim() } });
    if (exists && exists.id !== id) {
      throw new Error("Já existe uma categoria com esse nome");
    }

    categoria.nome = nome.trim();
    await repo.save(categoria);

    return categoria;
  }
}
