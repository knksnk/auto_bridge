import type { LoginPayload, RegisterPayload, UserProfile } from "../types/auth";
import { apiClient } from "./apiClient";

const mockUser: UserProfile = {
  id: "user-anastasia",
  name: "Анастасия",
  email: "anastasia@example.com",
  city: "Москва",
};

const wait = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 360));

export const authService = {
  login: async (payload: LoginPayload): Promise<UserProfile> => {
    try {
      return await apiClient.post<UserProfile>("/auth/login", payload);
    } catch {
      return wait(mockUser);
    }
  },
  register: async (payload: RegisterPayload): Promise<UserProfile> => {
    try {
      return await apiClient.post<UserProfile>("/auth/register", payload);
    } catch {
      return wait({
        ...mockUser,
        name: payload.name || mockUser.name,
        email: payload.email || mockUser.email,
        city: payload.city || mockUser.city,
      });
    }
  },
  getCurrentUser: async (): Promise<UserProfile> => {
    try {
      return await apiClient.get<UserProfile>("/auth/me");
    } catch {
      return wait(mockUser);
    }
  },
  logout: async () => {
    try {
      return await apiClient.post<{ ok: boolean }>("/auth/logout");
    } catch {
      return { ok: true };
    }
  },
};
