import * as z from "zod";

// Esquema de validação para os dados da tabela 'order-history'
export const orderHistorySchema = z.object({
  order_id: z.number().int().positive(),
  created_at: z.string(), // Pode ser ajustado para um formato de data específico
  order_data: z.string().optional(),
  destination: z.string().optional(),
  status: z.enum(["delivered", "shipped", "pending", "canceled"]),
  total_value: z.number().positive(),
});

export type OrderHistory = z.infer<typeof orderHistorySchema>;