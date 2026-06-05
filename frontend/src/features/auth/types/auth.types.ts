export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string;
  coverPhoto: string | null;
  isVerified: boolean;
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}