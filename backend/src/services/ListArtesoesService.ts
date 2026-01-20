import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";

interface IRequest {
  page?: number;
  limit?: number;
  cidade?: string;
  nome_loja?: string;
}

export class ListArtesoesService {
  async execute({
    page = 1,
    limit = 10,
    cidade,
    nome_loja,
  }: IRequest) {
    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const skip = (page - 1) * limit;

    const query = artesaoRepository
      .createQueryBuilder("artesao")
      .take(limit)
      .skip(skip)
      .orderBy("artesao.created_at", "DESC");

    if (cidade) {
      query.andWhere("artesao.cidade LIKE :cidade", {
        cidade: `%${cidade}%`,
      });
    }

    if (nome_loja) {
      query.andWhere("artesao.nome_loja LIKE :nome_loja", {
        nome_loja: `%${nome_loja}%`,
      });
    }

    const [artesoes, total] = await query.getManyAndCount();

    return {
      data: artesoes,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
