import { Request, Response } from "express";
import { CreateCategoriaService } from "../services/CreateCategoriaService";
import { ListCategoriasService } from "../services/ListCategoriasService";
import { ShowCategoriaService } from "../services/ShowCategoriaService";
import { UpdateCategoriaService } from "../services/UpdateCategoriaService";
import { DeleteCategoriaService } from "../services/DeleteCategoriaService";

export class CategoriaController {
  async create(req: Request, res: Response) {
    const { nome } = req.body;

    const service = new CreateCategoriaService();

    try {
      const categoria = await service.execute({ nome });
      return res.status(201).json(categoria);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req: Request, res: Response) {
    const service = new ListCategoriasService();
    const categorias = await service.execute();
    return res.json(categorias);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const service = new ShowCategoriaService();

    try {
      const categoria = await service.execute(Number(id));
      return res.json(categoria);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome } = req.body;

    const service = new UpdateCategoriaService();

    try {
      const categoria = await service.execute({
        id: Number(id),
        nome,
      });
      return res.json(categoria);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const service = new DeleteCategoriaService();

    try {
      const result = await service.execute(Number(id));
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
