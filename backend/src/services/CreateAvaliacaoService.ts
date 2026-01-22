import { AppDataSource } from "../database/data-source";
import { Avaliacao } from "../entities/Avaliacao";
import { Produto } from "../entities/Produto";

interface IRequest {
  produto_id: number;
  cliente_id: number;
  nota: number;
  comentario?: string;
}

export class CreateAvaliacaoService {
  async execute({ produto_id, cliente_id, nota, comentario }: IRequest) {
    if (!produto_id) throw new Error("produto_id é obrigatório");

    if (!Number.isFinite(nota) || nota < 1 || nota > 5) {
      throw new Error("A nota deve ser um número entre 1 e 5");
    }

    const avaliacaoRepo = AppDataSource.getRepository(Avaliacao);
    const produtoRepo = AppDataSource.getRepository(Produto);

    const produto = await produtoRepo.findOne({ where: { id: produto_id } });
    if (!produto) throw new Error("Produto não encontrado");

    // regra: 1 avaliação por cliente por produto
    const jaExiste = await avaliacaoRepo.findOne({
      where: { produto_id, cliente_id },
    });

    if (jaExiste) {
      throw new Error("Você já avaliou este produto");
    }

    const avaliacao = avaliacaoRepo.create({
      produto_id,
      cliente_id,
      nota,
      comentario: comentario?.trim() || null,
    } as any);

    await avaliacaoRepo.save(avaliacao);

    return avaliacao;
  }
}
