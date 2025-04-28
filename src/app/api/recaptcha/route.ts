import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import ValidationError from '@/lib/handlers/errors/types/ValidationError';
import { verifyRecaptcha } from '@/services/RecaptchaService';
import { recaptchaVerifySchema } from '@/types/recaptcha';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = recaptchaVerifySchema.parse(body);
    
    const verificationResult = await verifyRecaptcha(token);
    
    if (!verificationResult.success) {
      throw new ValidationError('reCAPTCHA verification failed');
    }
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}