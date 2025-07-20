import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entity/user.entity";
import { Repository } from "typeorm";
import { Shop } from "./entity/shop.entity";
import { UserRole } from "../users/enums/user-role.enum";
import { CreateShopDto } from "./dtos/create-shop.dto";

@Injectable()
export class ShopService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>,
              @InjectRepository(Shop) private shopRepo: Repository<Shop>) {
  }

  async getAllShops() {
    return await this.shopRepo.find();
  }

  async getShopById(id: string) {
    const shop = await this.shopRepo.findOne({ where: { id } });

    if (!shop) {
      throw new NotFoundException("Shop is not found");
    }

    return shop;
  }

  async createShop(userId: string, shopDto: CreateShopDto) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['shop']});

    if (!user) {
      throw new NotFoundException("User not found!");
    }

    const shop = this.shopRepo.create({ name: shopDto.name, owner: { id: user.id } });

    if (user.role !== UserRole.SHOP_OWNER) {
      await this.userRepo.save({ ...user, role: UserRole.SHOP_OWNER });
    }

    return await this.shopRepo.save(shop);
  }
}
