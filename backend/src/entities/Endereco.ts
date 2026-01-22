import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("enderecos")
export class Endereco {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuario_id!: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario!: User;

  @Column()
  rua!: string;

  @Column()
  numero!: string;

  @Column()
  cidade!: string;

  @Column()
  cep!: string;
}
