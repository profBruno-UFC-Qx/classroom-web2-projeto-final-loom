import { AppDataSource } from "../database/data-source";
import { Avaliacao } from "../entities/Avaliacao";

export class ListAvaliacoesPorProdutoService {
  async execute(produto_id: number) {
    const repo = AppDataSource.getRepository(Avaliacao);

    return repo.find({
      where: { produto_id },
      order: { id: "DESC" as any },
      relations: ["cliente"], // traz info do cliente
    });
  }
}
