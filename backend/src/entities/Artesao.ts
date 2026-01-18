import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("artesaos")
export class Artesao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_loja: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  foto_perfil: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
