import { Request, Response } from "express";
import { CreateProdutoService } from "../services/CreateProdutoService";
import { ListProdutosService } from "../services/ListProdutosService";

export class ProdutoController {
  async create(request: Request, response: Response) {
    const userId = request.user.id;
    const { nome, descricao, preco, estoque, imagem } = request.body;

    const service = new CreateProdutoService();

    try {
      const produto = await service.execute({
        user_id: userId,
        nome,
        descricao,
        preco,
        estoque,
        imagem,
      });

      return response.status(201).json(produto);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const {
      page,
      limit,
      nome,
      cidade,
      artesao_id,
    } = req.query;

    const listProdutosService = new ListProdutosService();

    const produtos = await listProdutosService.execute({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      nome: nome ? String(nome) : undefined,
      cidade: cidade ? String(cidade) : undefined,
      artesao_id: artesao_id ? Number(artesao_id) : undefined,
    });

    return res.json(produtos);
  }
}
