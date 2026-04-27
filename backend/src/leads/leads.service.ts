import { Injectable } from "@nestjs/common";
import { LeadType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

export interface CreateLeadDto {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  carId?: string;
  type?: "CAR" | "PARTNER" | "GENERAL";
}

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(payload: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        comment: payload.comment,
        carId: payload.carId,
        type: payload.type ? LeadType[payload.type] : LeadType.CAR,
      },
    });
  }

  list() {
    return this.prisma.lead.findMany({
      include: { car: true, user: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
