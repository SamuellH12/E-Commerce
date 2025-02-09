import * as z from "zod";

// Esquema de validação para os dados da tabela 'product-order-history'
export const productOrderHistorySchema = z.object({
  id: z.number().int().positive(),
  created_at: z.string(), // Pode ser ajustado para um formato de data específico
  order_id: z.number().int().positive(),
  product_id: z.string().uuid(), // UUID do produto
  price_paid: z.number().positive(),
  amount: z.number().int().positive(),
});

export type ProductOrderHistory = z.infer<typeof productOrderHistorySchema>;