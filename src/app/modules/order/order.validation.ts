import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(24).max(24),
  price: z.number().positive(),
  quantity: z.number().min(1),
});
