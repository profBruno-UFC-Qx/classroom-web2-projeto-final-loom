import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Artesao } from "../entities/Artesao";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [User, Artesao],
  synchronize: true,
});