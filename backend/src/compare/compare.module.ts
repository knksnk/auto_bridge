import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CompareController } from "./compare.controller";
import { CompareService } from "./compare.service";

@Module({
  imports: [JwtModule],
  controllers: [CompareController],
  providers: [CompareService],
})
export class CompareModule {}
