import { Controller, Get, Param, Query } from "@nestjs/common";
import { CarsService, type CarQuery } from "./cars.service";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  list(@Query() query: CarQuery) {
    return this.carsService.list(query);
  }

  @Get(":slug/similar")
  similar(@Param("slug") slug: string) {
    return this.carsService.similar(slug);
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.carsService.findBySlug(slug);
  }
}
