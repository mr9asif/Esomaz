import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),

  email: z.email(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData =
  z.infer<typeof registerSchema>;