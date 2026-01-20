import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";
import { Artesao } from "../entities/Artesao";

interface IRequest {
  user_id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem?: string;
}

export class CreateProdutoService {
  async execute({
    user_id,
    nome,
    descricao,
    preco,
    estoque,
    imagem,
  }: IRequest) {
    const artesaoRepository = AppDataSource.getRepository(Artesao);
    const produtoRepository = AppDataSource.getRepository(Produto);

    const artesao = await artesaoRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (!artesao) {
      throw new Error("Apenas artesãos podem cadastrar produtos");
    }

    const produto = produtoRepository.create({
      nome,
      descricao,
      preco,
      estoque,
      imagem,
      artesao,
    });

    await produtoRepository.save(produto);

    return produto;
  }
}
