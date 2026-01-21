import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { ItemPedido } from "./ItemPedido";

export type PedidoStatus = "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO" | "CONCLUIDO";

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cliente_id!: number;

  @ManyToOne(() => User, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "cliente_id" })
  cliente!: User;

  @CreateDateColumn({ name: "data" })
  data!: Date;

  @Column({ type: "varchar", default: "PENDENTE" })
  status!: PedidoStatus;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  valor_total!: number;

  @OneToMany(() => ItemPedido, (item) => item.pedido, { cascade: true })
  itens!: ItemPedido[];
}
