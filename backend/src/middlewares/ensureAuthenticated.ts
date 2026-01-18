import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  tipo_usuario: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: "Token não informado",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!process.env.JWT_SECRET) {
    return response.status(500).json({
      error: "JWT secret não configurado",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as TokenPayload;

    request.user = {
      id: decoded.id,
      tipo_usuario: decoded.tipo_usuario,
    };

    return next();
  } catch {
    return response.status(401).json({
      error: "Token inválido",
    });
  }
}
