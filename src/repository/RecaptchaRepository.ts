import { RecaptchaVerifyResponse } from '@/types/recaptcha';

export async function verifyToken(token: string): Promise<RecaptchaVerifyResponse> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`,
  });
  
  return await response.json();
}