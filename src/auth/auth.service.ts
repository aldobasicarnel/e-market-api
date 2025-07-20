import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from "bcrypt";
import { UserRole } from "../users/enums/user-role.enum";

export type AuthInput = {email: string, password: string};
type SignInData = {userId: string, name: string, lastName: string, email: string, role: UserRole};
type AuthResults = {accessToken: string, userId: string, email: string, role: UserRole};
@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
  }

  async validateUser (input: AuthInput) : Promise<SignInData | null> {
    const user = await this.userService.getUserByEmail(input.email);

    if (user && (await bcrypt.compare(input.password,user.password))) {
        return {
          userId: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
    }
    return null;
  }

  async authenticate (input: AuthInput):Promise<AuthResults> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async signIn (user: SignInData): Promise<AuthResults> {
    const tokenPayload = {
      sub: user.userId,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      userId: user.userId,
      email: user.email,
      role: user.role
    }
  }

  async createUser (createUserDto: CreateUserDto) {
    return await this.userService.createNewUser(createUserDto);
  }
}
