import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";

export class ShowArtesaoService {
  async execute(artesao_id: number) {
    const repo = AppDataSource.getRepository(Artesao);

    const artesao = await repo.findOne({
      where: { id: artesao_id },
      relations: ["user"],
    });

    if (!artesao) throw new Error("Artesão não encontrado");

    return artesao;
  }
}
