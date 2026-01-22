import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const produtoRoutes = Router();
const produtoController = new ProdutoController();

produtoRoutes.get("/", produtoController.index);
produtoRoutes.get("/:id", produtoController.show);
produtoRoutes.post("/", ensureAuthenticated, produtoController.create);
produtoRoutes.put("/:id", ensureAuthenticated, produtoController.update);
produtoRoutes.delete("/:id", ensureAuthenticated, produtoController.delete);

export default produtoRoutes;
