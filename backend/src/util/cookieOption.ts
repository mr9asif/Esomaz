import type { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production"
    ? ("none" as const)
    : ("lax" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000,
};