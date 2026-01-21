import { AppDataSource } from "../database/data-source";
import { Avaliacao } from "../entities/Avaliacao";

interface IRequest {
  avaliacao_id: number;
  user_id: number;
  tipo_usuario: string;
  nota?: number;
  comentario?: string;
}

export class UpdateAvaliacaoService {
  async execute({ avaliacao_id, user_id, tipo_usuario, nota, comentario }: IRequest) {
    const repo = AppDataSource.getRepository(Avaliacao);

    const avaliacao = await repo.findOne({ where: { id: avaliacao_id } });

    if (!avaliacao) throw new Error("Avaliação não encontrada");

    // ✅ dono ou ADMIN
    if (tipo_usuario !== "ADMIN" && avaliacao.cliente_id !== user_id) {
      throw new Error("Você não pode editar avaliação de outro usuário");
    }

    if (nota !== undefined) {
      if (!Number.isFinite(nota) || nota < 1 || nota > 5) {
        throw new Error("A nota deve ser um número entre 1 e 5");
      }
      avaliacao.nota = nota;
    }

    if (comentario !== undefined) {
      avaliacao.comentario = comentario?.trim() || null;
    }

    await repo.save(avaliacao);

    return avaliacao;
  }
}
