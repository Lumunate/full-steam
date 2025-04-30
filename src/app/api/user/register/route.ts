import { NextRequest, NextResponse } from 'next/server';

import { EmailError } from '@/lib/emails';
import handleErrors from '@/lib/handlers/errors';
import { sendRegistrationEmail } from '@/services/RegistrationEmailService';
import { registerUser } from '@/services/UserService';
import { registerUserSchema } from '@/types/auth/register-user';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerUserSchema.parse(body);
    const result = await registerUser(validatedData);
    let emailError = null;

    try {
      await sendRegistrationEmail(
        result.email,
        result.firstName,
        result.role,
        result.isApproved
      );
    } catch (error) {
      if (error instanceof EmailError) {
        emailError = error.message;
      } else {
        emailError = 'Failed to send registration email';
      }
    }

    return NextResponse.json({ 
      ...result, 
      emailError 
    }, { 
      status: 201 
    });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}