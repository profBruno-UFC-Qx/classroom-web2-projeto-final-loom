import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const user = userRepository.create({ name, email });
    await userRepository.save(user);

    return res.status(201).json(user);
  }

  async list(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return res.json(users);
  }
}
