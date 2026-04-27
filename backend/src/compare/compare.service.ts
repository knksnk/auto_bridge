import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { mapCar } from "../cars/cars.mapper";

@Injectable()
export class CompareService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    const items = await this.prisma.compareItem.findMany({
      where: { userId },
      include: { car: { include: { seller: true, images: true } } },
      orderBy: { createdAt: "asc" },
    });

    return items.map((item) => mapCar(item.car));
  }

  async replace(userId: string, carIds: string[]) {
    await this.prisma.$transaction([
      this.prisma.compareItem.deleteMany({ where: { userId } }),
      ...carIds.slice(0, 3).map((carId) => this.prisma.compareItem.create({ data: { userId, carId } })),
    ]);

    return this.list(userId);
  }
}
