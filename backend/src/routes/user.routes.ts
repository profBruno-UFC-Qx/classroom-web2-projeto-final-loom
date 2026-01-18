import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);

userRoutes.get("/me", ensureAuthenticated, (req, res) => {
  return res.json({
    message: "Usuário autenticado",
    user: req.user,
  });
});

userRoutes.get(
  "/admin",
  ensureAuthenticated,
  ensureRole(["ADMIN"]),
  (req, res) => {
    return res.json({
      message: "Bem-vindo, administrador",
    });
  }
);

export default userRoutes;