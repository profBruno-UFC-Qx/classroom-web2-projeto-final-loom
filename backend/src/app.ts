import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import artesaoRoutes from "./routes/artesao.routes";
import produtoRoutes from "./routes/produto.routes";
import categoriaRoutes from "./routes/categoria.routes";
import enderecoRoutes from "./routes/endereco.routes";
import avaliacaoRoutes from "./routes/avaliacao.routes";
import pedidoRoutes from "./routes/pedido.routes";



const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/artesaos", artesaoRoutes);
app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/enderecos", enderecoRoutes);
app.use("/avaliacoes", avaliacaoRoutes);
app.use("/pedidos", pedidoRoutes);


export default app;
