import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import AuthError, { AuthErrorType } from '@/lib/handlers/errors/types/AuthError';
import * as UserRepository from '@/repository/UserRepository';
import { registerUser } from '@/services/UserService';
import { registerUserSchema } from '@/types/auth/register-user';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerUserSchema.parse(body);
    
    try {
      await UserRepository.findUserByEmail(validatedData.email);
      throw new AuthError(AuthErrorType.EMAIL_ALREADY_EXISTS, 409);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ errors: error.errors }, { status: 400 });
      }
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
      }
  
      if (error instanceof AuthError) {
        throw error;
      }
    }
    
    const result = await registerUser(validatedData);

    const { 
      password, 
      paymentCardNumber, 
      paymentCardCvv, 
      bankAccountNumber,
      ...safeUserData 
    } = result;
    
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}