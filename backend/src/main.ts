import cookieParser from "cookie-parser";
import express from "express";
import { join } from "node:path";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendOrigin = config.get<string>("FRONTEND_ORIGIN") ?? "http://localhost:5173";

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });
  app.use(cookieParser());
  app.use("/uploads", express.static(join(process.cwd(), "uploads")));

  const port = Number(config.get<string>("PORT") ?? 3000);
  await app.listen(port);
}

void bootstrap();
