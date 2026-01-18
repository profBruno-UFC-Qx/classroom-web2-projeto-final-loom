import { Request, Response, NextFunction } from "express";

export function ensureRole(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { tipo_usuario } = request.user;

    if (!roles.includes(tipo_usuario)) {
      return response.status(403).json({
        error: "Acesso negado",
      });
    }

    return next();
  };
}
