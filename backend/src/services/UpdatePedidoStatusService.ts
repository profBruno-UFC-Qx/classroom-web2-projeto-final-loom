import { AppDataSource } from "../database/data-source";
import { Pedido } from "../entities/Pedido";

interface IRequest {
  pedido_id: number;
  status: string;
}

export class UpdatePedidoStatusService {
  async execute({ pedido_id, status }: IRequest) {
    const repo = AppDataSource.getRepository(Pedido);

    const pedido = await repo.findOne({ where: { id: pedido_id } });

    if (!pedido) throw new Error("Pedido não encontrado");

    pedido.status = status;
    await repo.save(pedido);

    return pedido;
  }
}
