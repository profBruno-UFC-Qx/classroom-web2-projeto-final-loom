import { AppDataSource } from "../database/data-source";
import { Produto } from "../entities/Produto";

interface IRequest {
  artesao_id: number;
  page?: number;
  limit?: number;
}

export class ListProdutosPorArtesaoService {
  async execute({ artesao_id, page = 1, limit = 10 }: IRequest) {
    const produtoRepository = AppDataSource.getRepository(Produto);

    const skip = (page - 1) * limit;

    const [produtos, total] = await produtoRepository.findAndCount({
      where: {
        artesao: { id: artesao_id },
      },
      relations: ["artesao"],
      take: limit,
      skip,
      order: {
        created_at: "DESC",
      },
    });

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
