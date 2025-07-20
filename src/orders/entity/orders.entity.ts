import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entity/user.entity";
import { Product } from "../../products/Entity/Product.entity";
import { OrderItem } from "./order-item.entity";
import { IsUUID } from "@nestjs/class-validator";

@Entity({ name: "orders" })
export class Order {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @ManyToOne(() => User, (user) => user.orders)
  buyer: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
