import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { RequestUser } from "../auth/auth.types";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  @Get("me")
  me(@CurrentUser() user: RequestUser) {
    return user;
  }
}
