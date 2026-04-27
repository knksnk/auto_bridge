import { Injectable } from "@nestjs/common";
import { PartnerApplicationType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

export interface PartnerApplicationDto {
  type: "SELLER" | "CARRIER";
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  comment?: string;
}

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: PartnerApplicationDto) {
    return this.prisma.partnerApplication.create({
      data: {
        ...payload,
        type: PartnerApplicationType[payload.type],
      },
    });
  }

  list() {
    return this.prisma.partnerApplication.findMany({ orderBy: { createdAt: "desc" } });
  }
}
