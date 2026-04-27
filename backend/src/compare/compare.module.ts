import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CompareController } from "./compare.controller";
import { CompareService } from "./compare.service";

@Module({
  imports: [AuthModule],
  controllers: [CompareController],
  providers: [CompareService],
})
export class CompareModule {}
