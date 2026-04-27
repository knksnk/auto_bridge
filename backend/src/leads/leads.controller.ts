import { Body, Controller, Post } from "@nestjs/common";
import { LeadsService, type CreateLeadDto } from "./leads.service";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() body: CreateLeadDto) {
    return this.leadsService.create(body);
  }
}
