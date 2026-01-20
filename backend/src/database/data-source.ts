import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Artesao } from "../entities/Artesao";
import { Produto } from "../entities/Produto";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [User, Artesao, Produto],
  synchronize: true,
});