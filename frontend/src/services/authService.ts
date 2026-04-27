import type { LoginPayload, RegisterPayload, UserProfile } from "../types/auth";

const mockUser: UserProfile = {
  id: "user-anastasia",
  name: "Анастасия",
  email: "anastasia@example.com",
  city: "Москва",
};

export const authService = {
  login: async (_payload: LoginPayload): Promise<UserProfile> => mockUser,
  register: async (payload: RegisterPayload): Promise<UserProfile> => ({
    ...mockUser,
    name: payload.name || mockUser.name,
    email: payload.email || mockUser.email,
    city: payload.city || mockUser.city,
  }),
  getCurrentUser: async (): Promise<UserProfile> => mockUser,
};
