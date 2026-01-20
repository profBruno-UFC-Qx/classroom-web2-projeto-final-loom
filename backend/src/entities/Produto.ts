import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Artesao } from "./Artesao";

@Entity("produtos")
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column("text")
  descricao!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;

  @Column()
  estoque!: number;

  @Column({ nullable: true })
  imagem!: string;

  @ManyToOne(() => Artesao)
  artesao!: Artesao;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
