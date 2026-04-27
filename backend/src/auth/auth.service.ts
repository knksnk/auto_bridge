import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phone?: string;
  city?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterPayload) {
    const exists = await this.prisma.user.findUnique({ where: { email: payload.email } });

    if (exists) {
      throw new ConflictException("Пользователь с таким email уже существует");
    }

    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        passwordHash: await bcrypt.hash(payload.password, 10),
        name: payload.name,
        phone: payload.phone,
        city: payload.city,
        role: Role.USER,
      },
    });

    return this.createSession(user);
  }

  async login(payload: LoginPayload) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } });

    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      throw new UnauthorizedException("Неверный email или пароль");
    }

    return this.createSession(user);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException("Пользователь не найден");
    }

    return this.toPublicUser(user);
  }

  private createSession(user: { id: string; email: string; name: string; city: string | null; phone: string | null; role: Role }) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: this.toPublicUser(user),
    };
  }

  private toPublicUser(user: { id: string; email: string; name: string; city: string | null; phone: string | null; role: Role }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      city: user.city ?? "",
      phone: user.phone ?? "",
      role: user.role,
    };
  }
}
