import { z } from 'zod';

import { resetPasswordSchema } from './reset-password';

export const loginSchema = resetPasswordSchema.extend({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type LoginInput = z.infer<typeof loginSchema>;
