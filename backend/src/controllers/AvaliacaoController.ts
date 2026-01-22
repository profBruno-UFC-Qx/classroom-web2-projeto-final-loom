import { Request, Response } from "express";
import { CreateAvaliacaoService } from "../services/CreateAvaliacaoService";
import { ListAvaliacoesPorProdutoService } from "../services/ListAvaliacoesPorProdutoService";
import { UpdateAvaliacaoService } from "../services/UpdateAvaliacaoService";
import { DeleteAvaliacaoService } from "../services/DeleteAvaliacaoService";

export class AvaliacaoController {
  async create(req: Request, res: Response) {
    const cliente_id = req.user.id;
    const { produto_id, nota, comentario } = req.body;

    const service = new CreateAvaliacaoService();

    try {
      const avaliacao = await service.execute({
        produto_id: Number(produto_id),
        cliente_id,
        nota: Number(nota),
        comentario,
      });

      return res.status(201).json(avaliacao);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listByProduto(req: Request, res: Response) {
    const { produto_id } = req.params;

    const service = new ListAvaliacoesPorProdutoService();
    const avaliacoes = await service.execute(Number(produto_id));

    return res.json(avaliacoes);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nota, comentario } = req.body;

    const service = new UpdateAvaliacaoService();

    try {
      const avaliacao = await service.execute({
        avaliacao_id: Number(id),
        user_id: req.user.id,
        tipo_usuario: req.user.tipo_usuario,
        nota: nota !== undefined ? Number(nota) : undefined,
        comentario,
      });

      return res.json(avaliacao);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteAvaliacaoService();

    try {
      const result = await service.execute({
        avaliacao_id: Number(id),
        user_id: req.user.id,
        tipo_usuario: req.user.tipo_usuario,
      });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
