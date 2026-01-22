import { Request, Response } from "express";
import { CreatePedidoService } from "../services/CreatePedidoService";
import { ListMePedidosService } from "../services/ListMePedidosService";
import { ShowPedidoService } from "../services/ShowPedidoService";
import { UpdatePedidoStatusService } from "../services/UpdatePedidoStatusService";
import { CancelPedidoService } from "../services/CancelPedidoService";

export class PedidoController {
  async create(req: Request, res: Response) {
    const cliente_id = req.user.id;
    const { itens } = req.body;

    const service = new CreatePedidoService();

    try {
      const pedido = await service.execute({ cliente_id, itens });
      return res.status(201).json(pedido);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listMe(req: Request, res: Response) {
    const service = new ListMePedidosService();
    const pedidos = await service.execute(req.user.id);
    return res.json(pedidos);
  }

  async show(req: Request, res: Response) {
    const service = new ShowPedidoService();

    try {
      const pedido = await service.execute(Number(req.params.id));
      return res.json(pedido);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    const service = new UpdatePedidoStatusService();

    try {
      const pedido = await service.execute({
        pedido_id: Number(req.params.id),
        status: req.body.status,
      });
      return res.json(pedido);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async cancel(req: Request, res: Response) {
    const service = new CancelPedidoService();

    try {
      const result = await service.execute({
        pedido_id: Number(req.params.id),
        user_id: req.user.id,
      });
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
