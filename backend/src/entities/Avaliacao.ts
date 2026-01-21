import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Produto } from "./Produto";
import { User } from "./User";

@Entity("avaliacoes")
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  produto_id!: number;

  @ManyToOne(() => Produto, { onDelete: "CASCADE" })
  @JoinColumn({ name: "produto_id" })
  produto!: Produto;

  @Column()
  cliente_id!: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cliente_id" })
  cliente!: User;

  @Column({ type: "int" })
  nota!: number; // ideal: 1 a 5

  @Column({ type: "text", nullable: true })
  comentario?: string;

  @CreateDateColumn({ name: "data" })
  data!: Date;
}
