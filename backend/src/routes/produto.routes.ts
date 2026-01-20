import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const produtoRoutes = Router();
const produtoController = new ProdutoController();

produtoRoutes.get("/", produtoController.index);
produtoRoutes.post("/", ensureAuthenticated, produtoController.create);

export default produtoRoutes;
