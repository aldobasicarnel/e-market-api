import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Module } from "@nestjs/common";
import { Shop } from "../shop/entity/shop.entity";
import { Product } from "../products/Entity/Product.entity";
import { Order } from "../orders/entity/orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Shop, Product, Order])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
