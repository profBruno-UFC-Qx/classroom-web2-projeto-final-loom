import { Router } from "express";
import { ArtesaoController } from "../controllers/ArtesaoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const artesaoRoutes = Router();
const artesaoController = new ArtesaoController();

artesaoRoutes.post("/", ensureAuthenticated, artesaoController.create);
artesaoRoutes.get("/me", ensureAuthenticated, artesaoController.me);
artesaoRoutes.put("/me", ensureAuthenticated, artesaoController.update);
artesaoRoutes.delete("/me", ensureAuthenticated, artesaoController.deleteMe);
artesaoRoutes.get("/", artesaoController.index);
artesaoRoutes.get("/:id", artesaoController.show);
artesaoRoutes.get("/:id/produtos", artesaoController.produtos);

export default artesaoRoutes;
