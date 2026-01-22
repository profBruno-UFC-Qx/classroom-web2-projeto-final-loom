import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

const categoriaRoutes = Router();
const categoriaController = new CategoriaController();

// Público
categoriaRoutes.get("/", categoriaController.index);
categoriaRoutes.get("/:id", categoriaController.show);

// ADMIN
categoriaRoutes.post(
  "/",
  ensureAuthenticated,
  ensureRole(["ADMIN"]),
  categoriaController.create
);

categoriaRoutes.put(
  "/:id",
  ensureAuthenticated,
  ensureRole(["ADMIN"]),
  categoriaController.update
);

categoriaRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureRole(["ADMIN"]),
  categoriaController.delete
);

export default categoriaRoutes;
