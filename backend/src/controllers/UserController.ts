import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { ShowUserService } from "../services/ShowUserService";
import { UpdateUserMeService } from "../services/UpdateUserMeService";
import { DeleteUserMeService } from "../services/DeleteUserMeService";

export class UserController {
  async create(req: Request, res: Response) {
    const { nome, email, senha, tipo_usuario } = req.body;

    const service = new CreateUserService();

    try {
      const user = await service.execute({
        nome,
        email,
        senha,
        tipo_usuario,
      });

      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req: Request, res: Response) {
    const service = new ListUsersService();
    const users = await service.execute();
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const service = new ShowUserService();

    try {
      const user = await service.execute(Number(id));
      return res.json(user);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async updateMe(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const service = new UpdateUserMeService();

    try {
      const user = await service.execute({
        user_id: req.user.id,
        nome,
        email,
        senha,
      });

      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async deleteMe(req: Request, res: Response) {
    const service = new DeleteUserMeService();

    try {
      const result = await service.execute(req.user.id);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
