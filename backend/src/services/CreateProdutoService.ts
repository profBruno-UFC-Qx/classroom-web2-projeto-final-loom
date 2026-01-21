import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";
import { Artesao } from "../entities/Artesao";
import { Categoria } from "../entities/Categoria";

interface IRequest {
  user_id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem?: string | null;

  categoria_id?: number | null;
}

export class CreateProdutoService {
  async execute({
    user_id,
    nome,
    descricao,
    preco,
    estoque,
    imagem = null,
    categoria_id = null,
  }: IRequest) {
    const artesaoRepository = AppDataSource.getRepository(Artesao);
    const produtoRepository = AppDataSource.getRepository(Produto);
    const categoriaRepository = AppDataSource.getRepository(Categoria);

    const artesao = await artesaoRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (!artesao) {
      throw new Error("Apenas artesãos podem cadastrar produtos");
    }

    // ✅ valida categoria (se vier)
    let categoria = null;
    if (categoria_id) {
      categoria = await categoriaRepository.findOne({
        where: { id: categoria_id },
      });

      if (!categoria) {
        throw new Error("Categoria não encontrada");
      }
    }

    const produto = produtoRepository.create({
      nome,
      descricao,
      preco,
      estoque,
      imagem,
      artesaoId: artesao.id,      // ✅ FK
      categoria_id: categoria ? categoria.id : null,
      categoria: categoria ?? undefined,
    });

    await produtoRepository.save(produto);

    return produto;
  }
}
