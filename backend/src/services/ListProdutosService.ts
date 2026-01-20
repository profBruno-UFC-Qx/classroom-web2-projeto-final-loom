import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";
import { Like } from "typeorm";

interface IRequest {
  page?: number;
  limit?: number;
  nome?: string;
  cidade?: string;
  artesao_id?: number;
}

export class ListProdutosService {
  async execute({
    page = 1,
    limit = 10,
    nome,
    cidade,
    artesao_id,
  }: IRequest) {
    const produtoRepository = AppDataSource.getRepository(Produto);

    const skip = (page - 1) * limit;

    const query = produtoRepository
      .createQueryBuilder("produto")
      .leftJoinAndSelect("produto.artesao", "artesao")
      .take(limit)
      .skip(skip)
      .orderBy("produto.created_at", "DESC");

    if (nome) {
      query.andWhere("produto.nome LIKE :nome", {
        nome: `%${nome}%`,
      });
    }

    if (artesao_id) {
      query.andWhere("artesao.id = :artesao_id", { artesao_id });
    }

    if (cidade) {
      query.andWhere("artesao.cidade LIKE :cidade", {
        cidade: `%${cidade}%`,
      });
    }

    const [produtos, total] = await query.getManyAndCount();

    return {
      data: produtos,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
