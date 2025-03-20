import { z } from "zod";

export const productEditSchema = z.object({
  id: z.string(),
  name: z.string().min(4),
  description: z.string().min(10),
  price: z.number(),
  stock_quantity: z.number(),
  image_url: z.string(),
  category_id: z.string(),
});
