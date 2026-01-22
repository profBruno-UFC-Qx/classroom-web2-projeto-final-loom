import { AppDataSource } from "../database/data-source";
import { Pedido } from "../entities/Pedido";

export class ListMePedidosService {
  async execute(cliente_id: number) {
    const repo = AppDataSource.getRepository(Pedido);

    return repo.find({
      where: { cliente_id },
      relations: ["itens", "itens.produto"],
      order: { id: "DESC" as any },
    });
  }
}
