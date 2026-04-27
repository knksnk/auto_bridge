import { Injectable, NotFoundException } from "@nestjs/common";
import { CarStatus, Prisma, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { mapCar, type CarWithRelations } from "../cars/cars.mapper";

export interface AdminCarPayload {
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  trim: string;
  color: string;
  engine: string;
  power: string;
  fuel: string;
  body: string;
  doors: number;
  drive: string;
  transmission: string;
  chinaPrice: number;
  turnkeyPrice: number;
  logisticsPrice: number;
  deliveryTime: string;
  route: string;
  inspection: string;
  coverTone?: string;
  tags?: string[];
  isVerified?: boolean;
  status?: CarStatus;
  sellerId: string;
  images?: Array<{ url: string; alt: string; sortOrder?: number }>;
}

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [cars, publishedCars, leads, partnerApplications, sellers, users] = await Promise.all([
      this.prisma.car.count({ where: { deletedAt: null } }),
      this.prisma.car.count({ where: { deletedAt: null, status: CarStatus.PUBLISHED } }),
      this.prisma.lead.count(),
      this.prisma.partnerApplication.count(),
      this.prisma.seller.count(),
      this.prisma.user.count(),
    ]);

    return { cars, publishedCars, leads, partnerApplications, sellers, users };
  }

  async listCars() {
    const cars = await this.prisma.car.findMany({
      where: { deletedAt: null },
      include: { seller: true, images: true },
      orderBy: { updatedAt: "desc" },
    });

    return cars.map(mapCar);
  }

  async getCar(id: string) {
    const car = await this.prisma.car.findFirst({
      where: { id, deletedAt: null },
      include: { seller: true, images: true },
    });

    if (!car) {
      throw new NotFoundException("Автомобиль не найден");
    }

    return mapCar(car);
  }

  async createCar(payload: AdminCarPayload) {
    const { images = [], ...carPayload } = payload;
    const car = await this.prisma.car.create({
      data: {
        ...this.normalizeCreatePayload(carPayload),
        images: {
          create: images.map((image, index) => ({
            url: image.url,
            alt: image.alt,
            sortOrder: image.sortOrder ?? index,
          })),
        },
      },
      include: { seller: true, images: true },
    });

    return mapCar(car as CarWithRelations);
  }

  async updateCar(id: string, payload: Partial<AdminCarPayload>) {
    const { images, ...carPayload } = payload;
    const normalized = this.normalizeUpdatePayload(carPayload);

    const car = await this.prisma.$transaction(async (tx) => {
      if (images) {
        await tx.carImage.deleteMany({ where: { carId: id } });
        await tx.carImage.createMany({
          data: images.map((image, index) => ({
            carId: id,
            url: image.url,
            alt: image.alt,
            sortOrder: image.sortOrder ?? index,
          })),
        });
      }

      return tx.car.update({
        where: { id },
        data: normalized,
        include: { seller: true, images: true },
      });
    });

    return mapCar(car as CarWithRelations);
  }

  async removeCar(id: string) {
    await this.prisma.car.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: CarStatus.ARCHIVED,
      },
    });

    return { ok: true };
  }

  listSellers() {
    return this.prisma.seller.findMany({ orderBy: { name: "asc" } });
  }

  createSeller(payload: { name: string; city: string; phone?: string; email?: string; rating?: number; verified?: boolean }) {
    return this.prisma.seller.create({
      data: {
        name: payload.name,
        city: payload.city,
        phone: payload.phone,
        email: payload.email,
        rating: payload.rating ?? 4.8,
        verified: payload.verified ?? true,
      },
    });
  }

  listLeads() {
    return this.prisma.lead.findMany({
      include: { car: true, user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  listPartnerApplications() {
    return this.prisma.partnerApplication.findMany({ orderBy: { createdAt: "desc" } });
  }

  listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        city: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async createAdminIfNeeded(email: string, password: string) {
    const exists = await this.prisma.user.findUnique({ where: { email } });

    if (exists) {
      return exists;
    }

    return this.prisma.user.create({
      data: {
        email,
        name: "Администратор",
        passwordHash: await bcrypt.hash(password, 10),
        role: Role.ADMIN,
      },
    });
  }

  private normalizeCreatePayload(payload: Omit<AdminCarPayload, "images">): Prisma.CarUncheckedCreateInput {
    return payload;
  }

  private normalizeUpdatePayload(payload: Partial<AdminCarPayload>): Prisma.CarUncheckedUpdateInput {
    return Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ""),
    ) as Prisma.CarUncheckedUpdateInput;
  }
}
