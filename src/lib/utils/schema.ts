import { z } from "zod";

export const orderFormSchema = z.object({
  receiver: z.string().min(4, "Name is too short."),
  phone: z
    .string()
    .max(15, "Phone no. is too large")
    .min(11, "Phone no. is too small"),
  email: z.string().email().optional(),
  district: z.string().min(1, "Please select an option"),
  upazila: z.string().min(1, "Please select an option"),
  street: z.string().min(5, "Address is too short"),
  cod: z.boolean(),
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;

export const signupFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, "username is too short")
    .max(32, "username is too long"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password should be minimum 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  passwordConfirm: z.string(),
});

export type SignupFormInput = z.infer<typeof signupFormSchema>;

export const signinFormSchema = z.object({
  ideintifier: z.string(),
  password: z.string(),
});

export type SigninFormInput = z.infer<typeof signinFormSchema>;