import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  username: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),

  email: z.email(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const loginValidationSchema = z.object({
  identifier: z
    .string()
    .min(3, "Email or username is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});