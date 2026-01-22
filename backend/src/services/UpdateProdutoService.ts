import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";
import { Artesao } from "../entities/Artesao";

interface IRequest {
  produto_id: number;
  user_id: number;
  tipo_usuario: string; // "ADMIN" | "ARTESAO" | ...
  nome?: string;
  descricao?: string;
  preco?: number;
  estoque?: number;
  imagem?: string | null;
}

export class UpdateProdutoService {
  async execute({
    produto_id,
    user_id,
    tipo_usuario,
    nome,
    descricao,
    preco,
    estoque,
    imagem,
  }: IRequest) {
    const produtoRepository = AppDataSource.getRepository(Produto);
    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const produto = await produtoRepository.findOne({
      where: { id: produto_id },
      relations: ["artesao", "artesao.user"],
    });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    // Admin pode editar qualquer produto
    if (tipo_usuario !== "ADMIN") {
      const artesao = await artesaoRepository.findOne({
        where: { user: { id: user_id } },
      });

      if (!artesao) {
        throw new Error("Apenas artesãos podem editar produtos");
      }

      if (produto.artesao.id !== artesao.id) {
        throw new Error("Você não pode editar produto de outro artesão");
      }
    }

    // Update parcial (só altera o que veio)
    if (nome !== undefined) produto.nome = nome;
    if (descricao !== undefined) produto.descricao = descricao;
    if (preco !== undefined) produto.preco = preco;
    if (estoque !== undefined) produto.estoque = estoque;
    if (imagem !== undefined) produto.imagem = imagem as any;

    await produtoRepository.save(produto);

    return produto;
  }
}
