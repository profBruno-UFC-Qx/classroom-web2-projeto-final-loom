import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";

export class DeleteArtesaoMeService {
  async execute(user_id: number) {
    const repo = AppDataSource.getRepository(Artesao);

    const artesao = await repo.findOne({
      where: { user: { id: user_id } },
      relations: ["user"],
    });

    if (!artesao) throw new Error("Perfil de artesão não encontrado");

    await repo.remove(artesao);

    return { message: "Perfil de artesão removido com sucesso" };
  }
}
