import { AppDataSource } from "../database/data-source";
import { Avaliacao } from "../entities/Avaliacao";

interface IRequest {
  avaliacao_id: number;
  user_id: number;
  tipo_usuario: string;
}

export class DeleteAvaliacaoService {
  async execute({ avaliacao_id, user_id, tipo_usuario }: IRequest) {
    const repo = AppDataSource.getRepository(Avaliacao);

    const avaliacao = await repo.findOne({ where: { id: avaliacao_id } });

    if (!avaliacao) throw new Error("Avaliação não encontrada");

    // ✅ dono ou ADMIN
    if (tipo_usuario !== "ADMIN" && avaliacao.cliente_id !== user_id) {
      throw new Error("Você não pode remover avaliação de outro usuário");
    }

    await repo.remove(avaliacao);

    return { message: "Avaliação removida com sucesso" };
  }
}
