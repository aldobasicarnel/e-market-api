import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../auth/dtos/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {


  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
  }
  async getUserByEmail(email: string){
    return await this.userRepo.findOne({where: {email}});
  }

  async createNewUser (createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.userRepo.findOne({where: {email}});

    if (user) {
      throw new NotFoundException("User with this email already exists in database!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({...createUserDto, password: hashedPassword});

    await this.userRepo.save(newUser);
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      lastName: newUser.lastName,
    };
  }
}
