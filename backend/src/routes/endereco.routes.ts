import { Router } from "express";
import { EnderecoController } from "../controllers/EnderecoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const enderecoRoutes = Router();
const enderecoController = new EnderecoController();

// criar endereço (do usuário logado)
enderecoRoutes.post("/", ensureAuthenticated, enderecoController.create);

// listar meus endereços
enderecoRoutes.get("/me", ensureAuthenticated, enderecoController.listMe);

// atualizar endereço (só dono)
enderecoRoutes.put("/:id", ensureAuthenticated, enderecoController.update);

// deletar endereço (só dono)
enderecoRoutes.delete("/:id", ensureAuthenticated, enderecoController.delete);

export default enderecoRoutes;
