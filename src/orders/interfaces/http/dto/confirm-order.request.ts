import { z } from 'zod';

export const confirmOrderRequestDto = z.object({
  orderId: z.string(),
});

export type ConfirmOrderRequestDto = z.infer<typeof confirmOrderRequestDto>;
