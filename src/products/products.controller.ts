import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import {AuthGuard} from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../users/enums/user-role.enum";


@Controller('product')
export class ProductsController {

  constructor (private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }


  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_OWNER)
  @Post(":id")
  createNewProduct (@Param("id") userId: string, @Body() createProductDto: CreateProductDto) {
    return this.productsService.createNewProduct(userId, createProductDto);
  }
}
