import { AppDataSource } from "../database/data-source";
import { Pedido } from "../entities/Pedido";
import { ItemPedido } from "../entities/ItemPedido";
import { Produto } from "../entities/Produto";

interface IItem {
  produto_id: number;
  quantidade: number;
}

interface IRequest {
  cliente_id: number;
  itens: IItem[];
}

export class CreatePedidoService {
  async execute({ cliente_id, itens }: IRequest) {
    if (!itens || itens.length === 0) {
      throw new Error("O pedido precisa ter pelo menos 1 item");
    }

    const pedidoRepo = AppDataSource.getRepository(Pedido);
    const itemRepo = AppDataSource.getRepository(ItemPedido);
    const produtoRepo = AppDataSource.getRepository(Produto);

    let valor_total = 0;
    const itensPedido: ItemPedido[] = [];

    for (const item of itens) {
      const produto = await produtoRepo.findOne({ where: { id: item.produto_id } });

      if (!produto) throw new Error(`Produto ${item.produto_id} não encontrado`);

      if (produto.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
      }

      // calcula subtotal
      const subtotal = Number(produto.preco) * item.quantidade;
      valor_total += subtotal;

      // baixa estoque
      produto.estoque -= item.quantidade;
      await produtoRepo.save(produto);

      const itemPedido = itemRepo.create({
        produto_id: produto.id,
        quantidade: item.quantidade,
        preco_unitario: produto.preco,
      });

      itensPedido.push(itemPedido);
    }

    const pedido = pedidoRepo.create({
      cliente_id,
      valor_total,
      status: "PENDENTE",
      itens: itensPedido,
    });

    await pedidoRepo.save(pedido);

    return pedido;
  }
}
