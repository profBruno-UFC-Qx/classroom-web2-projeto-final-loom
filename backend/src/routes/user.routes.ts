import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureRole } from "../middlewares/ensureRole";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);

userRoutes.get(
  "/",
  ensureAuthenticated,
  ensureRole(["ADMIN"]),
  userController.index
);

userRoutes.get(
  "/:id",
  ensureAuthenticated,
  ensureRole(["ADMIN"]),
  userController.show
);

userRoutes.put(
  "/me",
  ensureAuthenticated,
  userController.updateMe
);

userRoutes.delete(
  "/me",
  ensureAuthenticated,
  userController.deleteMe
);

export default userRoutes;
