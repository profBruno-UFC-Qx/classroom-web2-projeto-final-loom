import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Produto } from "./Produto";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nome!: string;

  @OneToMany(() => Produto, (produto: any) => produto.categoria)
  produtos!: Produto[];
}
