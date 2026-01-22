import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

const pedidoRoutes = Router();
const pedidoController = new PedidoController();

// CLIENTE
pedidoRoutes.post("/", ensureAuthenticated, ensureRole(["CLIENTE"]), pedidoController.create);
pedidoRoutes.get("/me", ensureAuthenticated, pedidoController.listMe);
pedidoRoutes.get("/:id", ensureAuthenticated, pedidoController.show);

// ADMIN / ARTESAO
pedidoRoutes.put(
  "/:id/status",
  ensureAuthenticated,
  ensureRole(["ADMIN", "ARTESAO"]),
  pedidoController.updateStatus
);

// CLIENTE (cancelar)
pedidoRoutes.delete("/:id", ensureAuthenticated, pedidoController.cancel);

export default pedidoRoutes;
