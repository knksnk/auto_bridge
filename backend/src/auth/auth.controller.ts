import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import { CurrentUser } from "./current-user.decorator";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";
import type { RequestUser } from "./auth.types";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: false,
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: { email: string; password: string; name: string; phone?: string; city?: string }, @Res({ passthrough: true }) response: Response) {
    const session = await this.authService.register(body);
    response.cookie("accessToken", session.accessToken, cookieOptions);
    return session.user;
  }

  @HttpCode(200)
  @Post("login")
  async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) response: Response) {
    const session = await this.authService.login(body);
    response.cookie("accessToken", session.accessToken, cookieOptions);
    return session.user;
  }

  @HttpCode(200)
  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("accessToken", { path: "/" });
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser() user: RequestUser) {
    return this.authService.me(user.id);
  }
}
