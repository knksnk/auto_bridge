import type { LoginPayload, RegisterPayload, UserProfile } from "../types/auth";

const mockUser: UserProfile = {
  id: "user-anastasia",
  name: "Анастасия",
  email: "anastasia@example.com",
  city: "Москва",
};

const wait = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 360));

export const authService = {
  login: async (_payload: LoginPayload): Promise<UserProfile> => wait(mockUser),
  register: async (payload: RegisterPayload): Promise<UserProfile> => wait({
    ...mockUser,
    name: payload.name || mockUser.name,
    email: payload.email || mockUser.email,
    city: payload.city || mockUser.city,
  }),
  getCurrentUser: async (): Promise<UserProfile> => wait(mockUser),
};
