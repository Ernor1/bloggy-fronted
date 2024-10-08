import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .nonempty("First Name is required")
    .min(2, "First Name must me at least 2 characters"),
  lastName: z
    .string()
    .nonempty("Last Name is required")
    .min(2, "Last Name must me at least 2 characters"),
  username: z
    .string()
    .nonempty("Username is required")
    .min(2, "username must me at least 2 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain alphanumeric and underscores"
    ),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
