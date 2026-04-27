import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { RequestUser } from "../auth/auth.types";
import { CompareService } from "./compare.service";

@UseGuards(JwtAuthGuard)
@Controller("me/compare")
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get()
  list(@CurrentUser() user: RequestUser) {
    return this.compareService.list(user.id);
  }

  @Put()
  replace(@CurrentUser() user: RequestUser, @Body() body: { carIds: string[] }) {
    return this.compareService.replace(user.id, body.carIds ?? []);
  }
}
