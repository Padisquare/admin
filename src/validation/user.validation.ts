import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^\S+$/, "Username cannot contain spaces"),
  email: z.email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(
      /^\+234[789][01]\d{8}$/,
      "Phone number must be in +234 format (e.g. +2348012345678)",
    ),
});
