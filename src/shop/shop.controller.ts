import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateShopDto } from "./dtos/create-shop.dto";


@Controller('shop')
export class ShopController {

  constructor(private readonly shopService: ShopService) {
  }

  @Get()
  getAllShops () {
    return this.shopService.getAllShops();
  }

  @Get(":id")
  getShopById(@Param("id") id: string) {
    return this.shopService.getShopById(id);
  }

  @UseGuards(AuthGuard)
  @Post(":id")
  createShop (@Param("id") userId: string, @Body() shopDto: CreateShopDto) {
    return this.shopService.createShop(userId, shopDto);
  }
}
