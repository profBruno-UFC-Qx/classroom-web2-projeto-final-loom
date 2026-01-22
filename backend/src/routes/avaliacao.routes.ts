import { Router } from "express";
import { AvaliacaoController } from "../controllers/AvaliacaoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

const avaliacaoRoutes = Router();
const avaliacaoController = new AvaliacaoController();

// Público: listar avaliações de um produto
avaliacaoRoutes.get(
  "/produto/:produto_id",
  avaliacaoController.listByProduto
);

// CLIENTE: criar avaliação
avaliacaoRoutes.post(
  "/",
  ensureAuthenticated,
  ensureRole(["CLIENTE"]),
  avaliacaoController.create
);

// Dono da avaliação (ou ADMIN): atualizar
avaliacaoRoutes.put(
  "/:id",
  ensureAuthenticated,
  avaliacaoController.update
);

// Dono da avaliação (ou ADMIN): deletar
avaliacaoRoutes.delete(
  "/:id",
  ensureAuthenticated,
  avaliacaoController.delete
);

export default avaliacaoRoutes;
