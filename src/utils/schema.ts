import { z } from "zod";

export const orderFormSchema = z.object({
  receiver: z.string().min(4, "Name is too short."),
  phone: z
    .string()
    .max(15, "Phone no. is too large")
    .min(11, "Phone no. is too small"),
  email: z.string().min(5, "Email is too small").email(),
  district: z.string().min(1, "Please select an option"),
  upazila: z.string().min(1, "Please select an option"),
  street: z.string().min(5, "Address is too short"),
  cod: z.boolean(),
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;
