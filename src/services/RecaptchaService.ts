import * as RecaptchaRepository from '@/repository/RecaptchaRepository';
import { RecaptchaVerifyResponse } from '@/types/recaptcha';

export async function verifyRecaptcha(token: string): Promise<RecaptchaVerifyResponse> {
  const verificationResponse = await RecaptchaRepository.verifyToken(token);
  
  return verificationResponse;
}