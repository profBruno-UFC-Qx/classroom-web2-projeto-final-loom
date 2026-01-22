import { AppDataSource } from "../database/data-source";
import { Pedido } from "../entities/Pedido";

interface IRequest {
  pedido_id: number;
  user_id: number;
}

export class CancelPedidoService {
  async execute({ pedido_id, user_id }: IRequest) {
    const repo = AppDataSource.getRepository(Pedido);

    const pedido = await repo.findOne({ where: { id: pedido_id } });

    if (!pedido) throw new Error("Pedido não encontrado");

    if (pedido.cliente_id !== user_id) {
      throw new Error("Você não pode cancelar pedido de outro usuário");
    }

    pedido.status = "CANCELADO";
    await repo.save(pedido);

    return { message: "Pedido cancelado com sucesso" };
  }
}
