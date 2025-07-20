import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AuthInput, AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  login (@Body() input: AuthInput) {
    return this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo (@Request() request) {
    return request.user;
  }

  @Post('register')
  createUser (@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
