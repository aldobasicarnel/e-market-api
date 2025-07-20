import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from "./Entity/Product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "../shop/entity/shop.entity";
import { OrderItem } from "../orders/entity/order-item.entity";
import { User } from "../users/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Shop, OrderItem, User])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
