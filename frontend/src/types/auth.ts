export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city?: string;
}
