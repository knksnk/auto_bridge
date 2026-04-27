import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "node:path";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AdminService, type AdminCarPayload } from "./admin.service";

const storage = diskStorage({
  destination: "uploads",
  filename: (_request, file, callback) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${file.fieldname}-${suffix}${extname(file.originalname)}`);
  },
});

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("dashboard")
  dashboard() {
    return this.adminService.dashboard();
  }

  @Get("cars")
  listCars() {
    return this.adminService.listCars();
  }

  @Get("cars/:id")
  getCar(@Param("id") id: string) {
    return this.adminService.getCar(id);
  }

  @Post("cars")
  createCar(@Body() body: AdminCarPayload) {
    return this.adminService.createCar(body);
  }

  @Patch("cars/:id")
  updateCar(@Param("id") id: string, @Body() body: Partial<AdminCarPayload>) {
    return this.adminService.updateCar(id, body);
  }

  @Delete("cars/:id")
  removeCar(@Param("id") id: string) {
    return this.adminService.removeCar(id);
  }

  @Get("sellers")
  listSellers() {
    return this.adminService.listSellers();
  }

  @Post("sellers")
  createSeller(@Body() body: { name: string; city: string; phone?: string; email?: string; rating?: number; verified?: boolean }) {
    return this.adminService.createSeller(body);
  }

  @Get("leads")
  listLeads() {
    return this.adminService.listLeads();
  }

  @Get("partner-applications")
  listPartnerApplications() {
    return this.adminService.listPartnerApplications();
  }

  @Get("users")
  listUsers() {
    return this.adminService.listUsers();
  }

  @Post("uploads")
  @UseInterceptors(FileInterceptor("file", { storage }))
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
}
