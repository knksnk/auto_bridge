import { Injectable, NotFoundException } from "@nestjs/common";
import { CarStatus, Prisma } from "@prisma/client";
import { parseOptionalInt } from "../common/money";
import { PrismaService } from "../prisma/prisma.service";
import { mapCar } from "./cars.mapper";

export interface CarQuery {
  search?: string;
  brand?: string;
  bodyType?: string;
  engine?: string;
  drive?: string;
  yearFrom?: string;
  yearTo?: string;
  chinaPriceFrom?: string;
  chinaPriceTo?: string;
  turnkeyPriceFrom?: string;
  turnkeyPriceTo?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

const include = {
  seller: true,
  images: true,
} satisfies Prisma.CarInclude;

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: CarQuery) {
    const page = Math.max(1, parseOptionalInt(query.page) ?? 1);
    const limit = Math.min(48, Math.max(1, parseOptionalInt(query.limit) ?? 12));
    const where = this.buildWhere(query, CarStatus.PUBLISHED);
    const [items, total] = await Promise.all([
      this.prisma.car.findMany({
        where,
        include,
        orderBy: this.buildOrderBy(query.sort),
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.car.count({ where }),
    ]);

    return {
      items: items.map(mapCar),
      total,
      page,
      limit,
      hasMore: page * limit < total,
    };
  }

  async findBySlug(slug: string) {
    const car = await this.prisma.car.findFirst({
      where: {
        slug,
        status: CarStatus.PUBLISHED,
        deletedAt: null,
      },
      include,
    });

    if (!car) {
      throw new NotFoundException("Автомобиль не найден");
    }

    return mapCar(car);
  }

  async similar(slug: string) {
    const car = await this.prisma.car.findUnique({ where: { slug } });

    if (!car) {
      throw new NotFoundException("Автомобиль не найден");
    }

    const items = await this.prisma.car.findMany({
      where: {
        id: { not: car.id },
        status: CarStatus.PUBLISHED,
        deletedAt: null,
        OR: [{ brand: car.brand }, { body: car.body }, { fuel: car.fuel }],
      },
      include,
      take: 3,
      orderBy: { updatedAt: "desc" },
    });

    return items.map(mapCar);
  }

  buildWhere(query: CarQuery, status?: CarStatus): Prisma.CarWhereInput {
    const search = query.search?.trim();
    const yearFrom = parseOptionalInt(query.yearFrom);
    const yearTo = parseOptionalInt(query.yearTo);
    const chinaPriceFrom = parseOptionalInt(query.chinaPriceFrom);
    const chinaPriceTo = parseOptionalInt(query.chinaPriceTo);
    const turnkeyPriceFrom = parseOptionalInt(query.turnkeyPriceFrom);
    const turnkeyPriceTo = parseOptionalInt(query.turnkeyPriceTo);

    return {
      deletedAt: null,
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { brand: { contains: search, mode: "insensitive" } },
              { model: { contains: search, mode: "insensitive" } },
              { body: { contains: search, mode: "insensitive" } },
              { engine: { contains: search, mode: "insensitive" } },
              { tags: { has: search } },
            ],
          }
        : {}),
      ...(query.brand ? { brand: { contains: query.brand, mode: "insensitive" } } : {}),
      ...(query.bodyType ? { body: { contains: query.bodyType, mode: "insensitive" } } : {}),
      ...(query.engine ? { engine: { contains: query.engine, mode: "insensitive" } } : {}),
      ...(query.drive ? { drive: { contains: query.drive, mode: "insensitive" } } : {}),
      ...(yearFrom || yearTo ? { year: { gte: yearFrom, lte: yearTo } } : {}),
      ...(chinaPriceFrom || chinaPriceTo ? { chinaPrice: { gte: chinaPriceFrom, lte: chinaPriceTo } } : {}),
      ...(turnkeyPriceFrom || turnkeyPriceTo ? { turnkeyPrice: { gte: turnkeyPriceFrom, lte: turnkeyPriceTo } } : {}),
    };
  }

  private buildOrderBy(sort?: string): Prisma.CarOrderByWithRelationInput {
    switch (sort) {
      case "date":
        return { createdAt: "desc" };
      case "price-asc":
        return { turnkeyPrice: "asc" };
      case "price-desc":
        return { turnkeyPrice: "desc" };
      case "year-new":
        return { year: "desc" };
      case "year-old":
        return { year: "asc" };
      case "mileage":
        return { mileageKm: "asc" };
      case "title":
        return { title: "asc" };
      default:
        return { updatedAt: "desc" };
    }
  }
}
