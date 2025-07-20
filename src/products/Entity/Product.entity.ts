import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "../../shop/entity/shop.entity";
import { OrderItem } from "../../orders/entity/order-item.entity";

@Entity({name: "product"})
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({type: 'float'})
  price: number;

  @Column()
  category: string

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];
}
