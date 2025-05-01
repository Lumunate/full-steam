import { z } from 'zod';

export const recaptchaVerifySchema = z.object({
  token: z.string().min(1, 'reCAPTCHA token is required'),
});

export type RecaptchaVerifyRequest = z.infer<typeof recaptchaVerifySchema>;

export interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
}