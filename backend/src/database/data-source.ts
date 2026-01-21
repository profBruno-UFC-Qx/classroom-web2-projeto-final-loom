import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Artesao } from "../entities/Artesao";
import { Produto } from "../entities/Produto";
import { Categoria } from "../entities/Categoria";
import { Endereco } from "../entities/Endereco";
import { Pedido } from "../entities/Pedido";
import { ItemPedido } from "../entities/ItemPedido";
import { Avaliacao } from "../entities/Avaliacao";



export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [
  User,
  Artesao,
  Produto,
  Categoria,
  Endereco,
  Pedido,
  ItemPedido,
  Avaliacao,
],
  synchronize: true,
});