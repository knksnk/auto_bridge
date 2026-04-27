import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import type { JwtPayload, RequestUser } from "./auth.types";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: RequestUser }>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Необходим вход в аккаунт");
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      request.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
      return true;
    } catch {
      throw new UnauthorizedException("Сессия устарела");
    }
  }

  private extractToken(request: Request) {
    const cookieToken = request.cookies?.accessToken as string | undefined;
    const authHeader = request.headers.authorization;

    if (cookieToken) {
      return cookieToken;
    }

    if (authHeader?.startsWith("Bearer ")) {
      return authHeader.slice(7);
    }

    return undefined;
  }
}
