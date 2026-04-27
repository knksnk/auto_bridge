import type { AdminCarPayload, AdminStats, CarListing } from "../types/catalog";
import { apiClient } from "./apiClient";
import { catalogCars } from "../data/mockCars";

export interface AdminSeller {
  id: string;
  name: string;
  city: string;
  rating: number;
  verified: boolean;
  phone?: string;
  email?: string;
}

export interface AdminLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  comment?: string;
  status: string;
  createdAt: string;
  car?: {
    title: string;
  };
}

const mockSellers: AdminSeller[] = [
  {
    id: "seller-autohub-china",
    name: "AutoHub China",
    city: "Гуанчжоу",
    rating: 4.9,
    verified: true,
    email: "seller@autobridge.local",
  },
];

export const adminService = {
  getDashboard: async (): Promise<AdminStats> => {
    try {
      return await apiClient.get<AdminStats>("/admin/dashboard");
    } catch {
      return {
        cars: catalogCars.length,
        publishedCars: catalogCars.length,
        leads: 8,
        partnerApplications: 3,
        sellers: mockSellers.length,
        users: 24,
      };
    }
  },

  getCars: async (): Promise<CarListing[]> => {
    try {
      return await apiClient.get<CarListing[]>("/admin/cars");
    } catch {
      return catalogCars;
    }
  },

  createCar: async (payload: AdminCarPayload): Promise<CarListing | AdminCarPayload> => {
    try {
      return await apiClient.post<CarListing>("/admin/cars", payload);
    } catch {
      return payload;
    }
  },

  updateCar: async (id: string, payload: Partial<AdminCarPayload>): Promise<CarListing | Partial<AdminCarPayload>> => {
    try {
      return await apiClient.patch<CarListing>(`/admin/cars/${id}`, payload);
    } catch {
      return payload;
    }
  },

  deleteCar: async (id: string) => {
    try {
      return await apiClient.delete<{ ok: boolean }>(`/admin/cars/${id}`);
    } catch {
      return { ok: true };
    }
  },

  getSellers: async (): Promise<AdminSeller[]> => {
    try {
      return await apiClient.get<AdminSeller[]>("/admin/sellers");
    } catch {
      return mockSellers;
    }
  },

  getLeads: async (): Promise<AdminLead[]> => {
    try {
      return await apiClient.get<AdminLead[]>("/admin/leads");
    } catch {
      return [
        {
          id: "lead-demo",
          name: "Анастасия",
          phone: "+7 999 000 00 00",
          email: "client@example.com",
          comment: "Хочу проверить итоговую цену по Haval Jolion",
          status: "NEW",
          createdAt: new Date().toISOString(),
          car: { title: "Haval Jolion 2024" },
        },
      ];
    }
  },
};
