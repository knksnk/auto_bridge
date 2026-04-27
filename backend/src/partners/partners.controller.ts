import { Body, Controller, Post } from "@nestjs/common";
import { PartnersService, type PartnerApplicationDto } from "./partners.service";

@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post("applications")
  create(@Body() body: PartnerApplicationDto) {
    return this.partnersService.create(body);
  }
}
