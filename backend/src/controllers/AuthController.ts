import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthController {
  async login(request: Request, response: Response) {
    const { email, senha } = request.body;

    const authService = new AuthenticateUserService();

    try {
      const auth = await authService.execute({
        email,
        senha,
      });

      return response.json(auth);
    } catch (err: any) {
      return response.status(401).json({
        error: err.message,
      });
    }
  }
}
