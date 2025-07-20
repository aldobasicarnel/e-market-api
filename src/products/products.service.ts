import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./Entity/Product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product.dto";
import { User } from "../users/entity/user.entity";
import { UserRole } from "../users/enums/user-role.enum";
import { Shop } from "../shop/entity/shop.entity";

@Injectable()
export class ProductsService {
  
  constructor(@InjectRepository(Product) private productsRepo: Repository<Product>,
              @InjectRepository(User) private userRepo: Repository<User>) {
  }
  
  getAllProducts () {
    return this.productsRepo.find();
  }

  async getProductById (id: string) {
    const product = await this.productsRepo.findOne({where: {id}, relations: ["shop"]});

    if (!product) {
      throw new NotFoundException(`Product with ${id} is not found`);
    }

    return product;
  }

  async createNewProduct (userId: string, createProductDto: CreateProductDto) {
    const user = await this.userRepo.findOne({where: {id : userId}, relations: ["shop"]});

    console.log("triggered and found user", user.id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.role !== UserRole.SHOP_OWNER) {
      throw new UnauthorizedException("Consumer cannot create new product.");
    }

    if (!user.shop) {
      throw new NotFoundException('Shop not found for this user.');
    }

    const newProduct = this.productsRepo.create({ ...createProductDto, shop: user.shop });

    return await this.productsRepo.save(newProduct);
  }
}
