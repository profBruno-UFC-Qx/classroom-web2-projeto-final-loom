import { AppDataSource } from "../database/data-source";
import { Pedido } from "../entities/Pedido";

export class ShowPedidoService {
  async execute(id: number) {
    const repo = AppDataSource.getRepository(Pedido);

    const pedido = await repo.findOne({
      where: { id },
      relations: ["itens", "itens.produto", "cliente"],
    });

    if (!pedido) throw new Error("Pedido não encontrado");

    return pedido;
  }
}
