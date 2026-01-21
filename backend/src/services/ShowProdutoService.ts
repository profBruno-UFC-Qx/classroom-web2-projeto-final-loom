import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";

export class ShowProdutoService {
  async execute(produto_id: number) {
    const produtoRepository = AppDataSource.getRepository(Produto);

    const produto = await produtoRepository.findOne({
      where: { id: produto_id },
      relations: ["artesao"],
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    return produto;
  }
}
