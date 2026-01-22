import { AppDataSource } from "../database/data-source";
import { Categoria } from "../entities/Categoria";

export class ListCategoriasService {
  async execute() {
    const repo = AppDataSource.getRepository(Categoria);
    return repo.find({ order: { id: "DESC" as any } });
  }
}
