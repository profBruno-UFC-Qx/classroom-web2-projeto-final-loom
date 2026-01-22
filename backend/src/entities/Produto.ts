import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Artesao } from "./Artesao";
import { Categoria } from "./Categoria";
import { Avaliacao } from "./Avaliacao";

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

  @Column({ type: "int" })
  estoque!: number;

  @Column({ nullable: true })
  imagem!: string | null;

  // ✅ FK do artesão (no seu banco está como artesaoId)
  @Column()
  artesaoId!: number;

  @ManyToOne(() => Artesao, { onDelete: "CASCADE" })
  @JoinColumn({ name: "artesaoId" })
  artesao!: Artesao;

  // ✅ Categoria (opcional)
  @Column({ nullable: true })
  categoria_id!: number | null;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "categoria_id" })
  categoria?: Categoria;

  // ✅ Avaliações do produto
  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.produto)
  avaliacoes!: Avaliacao[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
