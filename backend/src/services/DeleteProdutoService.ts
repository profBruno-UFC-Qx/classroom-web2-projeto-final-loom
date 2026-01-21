import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";
import { Artesao } from "../entities/Artesao";

interface IRequest {
  produto_id: number;
  user_id: number;
  tipo_usuario: string;
}

export class DeleteProdutoService {
  async execute({ produto_id, user_id, tipo_usuario }: IRequest) {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const produto = await produtoRepository.findOne({
      where: { id: produto_id },
      relations: ["artesao", "artesao.user"],
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Admin pode apagar qualquer produto
    if (tipo_usuario !== "ADMIN") {
      const artesao = await artesaoRepository.findOne({
        where: { user: { id: user_id } },
      });

      if (!artesao) {
        throw new Error("Apenas artesãos podem remover produtos");
      }

      if (produto.artesao.id !== artesao.id) {
        throw new Error("Você não pode remover produto de outro artesão");
      }
    }

    await produtoRepository.remove(produto);

    return { message: "Produto removido com sucesso" };
  }
}
