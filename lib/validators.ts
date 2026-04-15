import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(8),
  email: z.string().email().optional(),
  companyName: z.string().optional(),
  requirement: z.string().optional(),
  quantity: z.number().optional(),
});