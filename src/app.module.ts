import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "node:process";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./products/products.module";
import { Product } from "./products/Entity/Product.entity";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entity/user.entity";
import { AuthModule } from "./auth/auth.module";
import { ShopModule } from "./shop/shop.module";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/entity/orders.entity";
import { Shop } from "./shop/entity/shop.entity";
import { OrderItem } from "./orders/entity/order-item.entity";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/guards/roles.guard";
import { AuthGuard } from "./auth/guards/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // makes env vars available globally
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.SQL_HOST,
      port: parseInt(process.env.SQL_PORT, 10),
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      entities: [Product, User, Order, Shop, OrderItem],
      synchronize: true
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    ShopModule,
    OrdersModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {
}
