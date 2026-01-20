import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import artesaoRoutes from "./routes/artesao.routes";
import produtoRoutes from "./routes/produto.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/artesaos", artesaoRoutes);
app.use("/produtos", produtoRoutes);

export default app;
