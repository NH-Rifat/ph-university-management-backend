import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(0),
  category: z.string().min(3).max(255),
  tags: z.array(z.string()),
  variants: z.array(
    z.object({
      type: z.string().min(3).max(255),
      value: z.string().min(3).max(255),
    })
  ),
  inventory: z.object({
    quantity: z.number().min(0),
    inStock: z.boolean(),
  }),
  isDeleted: z.boolean(),
});
