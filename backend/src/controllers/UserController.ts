import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class UserController {
  async create(request: Request, response: Response) {
    const { nome, email, senha, tipo_usuario } = request.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        nome,
        email,
        senha,
        tipo_usuario,
      });

      return response.status(201).json(user);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}
