import { AppDataSource } from "../database/data-source";
import { Categoria } from "../entities/Categoria";

export class ShowCategoriaService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Categoria);

    const categoria = await repo.findOne({ where: { id } });
    if (!categoria) throw new Error("Categoria não encontrada");

    return categoria;
  }
}
