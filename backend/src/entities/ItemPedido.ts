import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

@Entity("itens_pedido")
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pedido_id!: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pedido_id" })
  pedido!: Pedido;

  @Column()
  produto_id!: number;

  @ManyToOne(() => Produto, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "produto_id" })
  produto!: Produto;

  @Column({ type: "int" })
  quantidade!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco_unitario!: number;
}
