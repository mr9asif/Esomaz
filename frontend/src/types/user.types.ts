// src/types/user.types.ts

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;

  bio?: string;
  avatar?: string;
  coverPhoto?: string;

  location?: string;
  website?: string;

  isVerified: boolean;

  createdAt: string;
  updatedAt: string;
}