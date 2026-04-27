import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { RequestUser } from "../auth/auth.types";
import { FavoritesService } from "./favorites.service";

@UseGuards(JwtAuthGuard)
@Controller("me/favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  list(@CurrentUser() user: RequestUser) {
    return this.favoritesService.list(user.id);
  }

  @Post()
  add(@CurrentUser() user: RequestUser, @Body() body: { carId: string }) {
    return this.favoritesService.add(user.id, body.carId);
  }

  @Delete(":carId")
  remove(@CurrentUser() user: RequestUser, @Param("carId") carId: string) {
    return this.favoritesService.remove(user.id, carId);
  }
}
