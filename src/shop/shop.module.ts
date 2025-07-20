import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entity/user.entity";
import { Product } from "../products/Entity/Product.entity";
import { Shop } from "./entity/shop.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User, Product])],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
