import { z } from "zod";

export const cardSchema = z.object({
	nickname: z.string(),
	name: z.string().nonempty(),
	code: z.string().min(13).max(16),
	expiration: z.string().min(7).max(7),
	cvc: z.string().min(3).max(3),
	transactionType: z.string().min(5).max(6),
});

export type CardType = z.infer<typeof cardSchema>;
