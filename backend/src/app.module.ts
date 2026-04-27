import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from "./cars/cars.module";
import { CompareModule } from "./compare/compare.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { LeadsModule } from "./leads/leads.module";
import { PartnersModule } from "./partners/partners.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CarsModule,
    FavoritesModule,
    CompareModule,
    LeadsModule,
    PartnersModule,
    UsersModule,
    AdminModule,
  ],
})
export class AppModule {}
