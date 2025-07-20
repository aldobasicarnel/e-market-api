import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsUUID } from "@nestjs/class-validator";
import { User } from "../../users/entity/user.entity";
import { Product } from "../../products/Entity/Product.entity";

@Entity({name: "shop"})
export class Shop {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.shop)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}
