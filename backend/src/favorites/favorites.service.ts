import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { mapCar } from "../cars/cars.mapper";

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: { car: { include: { seller: true, images: true } } },
      orderBy: { createdAt: "desc" },
    });

    return favorites.map((favorite) => mapCar(favorite.car));
  }

  async add(userId: string, carId: string) {
    await this.prisma.favorite.upsert({
      where: { userId_carId: { userId, carId } },
      update: {},
      create: { userId, carId },
    });

    return this.list(userId);
  }

  async remove(userId: string, carId: string) {
    await this.prisma.favorite.deleteMany({ where: { userId, carId } });
    return this.list(userId);
  }
}
