import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException("Missing or invalid authorization header!");
    }

    const token = authorization?.split(' ')[1];

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      req.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
        role: tokenPayload.role
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
