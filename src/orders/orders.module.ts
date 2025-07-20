import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entity/user.entity";
import { Product } from "../products/Entity/Product.entity";
import { Order } from "./entity/orders.entity";
import { OrderItem } from "./entity/order-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Order, OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
