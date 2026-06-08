import { createContext } from "react";
import type { User } from "../types/user.types";

export type AuthContextType = {
  user: User | null;

  loading: boolean;
};

export const AuthContext =
  createContext<AuthContextType | null>(null);