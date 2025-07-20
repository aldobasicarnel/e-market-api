import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsString, IsUUID } from "@nestjs/class-validator";
import { Shop } from "../../shop/entity/shop.entity";
import { Order } from "../../orders/entity/orders.entity";
import { UserRole } from "../enums/user-role.enum";

@Entity({name: 'user'})
export class User {

  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsEmail()
  @Column()
  email: string;

  @IsString()
  @Column()
  password: string;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  lastName: string;

  @OneToOne(() => Shop, (shop) => shop.owner)
  shop: Shop;

  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER
  })
  role: UserRole
}
