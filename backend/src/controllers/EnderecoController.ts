import { Request, Response } from "express";
import { CreateEnderecoService } from "../services/CreateEnderecoService";
import { ListMeEnderecosService } from "../services/ListMeEnderecosService";
import { UpdateEnderecoService } from "../services/UpdateEnderecoService";
import { DeleteEnderecoService } from "../services/DeleteEnderecoService";

export class EnderecoController {
  async create(req: Request, res: Response) {
    const userId = req.user.id;
    const { rua, numero, cidade, cep } = req.body;

    const service = new CreateEnderecoService();

    try {
      const endereco = await service.execute({
        user_id: userId,
        rua,
        numero,
        cidade,
        cep,
      });

      return res.status(201).json(endereco);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listMe(req: Request, res: Response) {
    const userId = req.user.id;

    const service = new ListMeEnderecosService();
    const enderecos = await service.execute(userId);

    return res.json(enderecos);
  }

  async update(req: Request, res: Response) {
    const userId = req.user.id;
    const { id } = req.params;
    const { rua, numero, cidade, cep } = req.body;

    const service = new UpdateEnderecoService();

    try {
      const endereco = await service.execute({
        endereco_id: Number(id),
        user_id: userId,
        rua,
        numero,
        cidade,
        cep,
      });

      return res.json(endereco);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.user.id;
    const { id } = req.params;

    const service = new DeleteEnderecoService();

    try {
      const result = await service.execute({
        endereco_id: Number(id),
        user_id: userId,
      });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
