import { AppDataSource } from "../database/data-source";
import { Categoria } from "../entities/Categoria";

export class DeleteCategoriaService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Categoria);

    const categoria = await repo.findOne({ where: { id } });
    if (!categoria) throw new Error("Categoria não encontrada");

    await repo.remove(categoria);

    return { message: "Categoria removida com sucesso" };
  }
}
