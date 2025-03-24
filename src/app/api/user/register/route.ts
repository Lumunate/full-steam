import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import { registerUser } from '@/services/UserService';
import { registerUserSchema } from '@/types/auth/register-user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerUserSchema.parse(body);
    
    const user = await registerUser(validatedData as { email: string } & typeof validatedData);
    
    const { 
      _password, 
      _paymentCardNumber, 
      _paymentCardCvv, 
      _bankAccountNumber,
      ...safeUserData 
    } = user;
    
    delete user.password;
    delete user.paymentCardNumber;
    delete user.paymentCardCvv;
    delete user.bankAccountNumber;

    return NextResponse.json(
      { 
        message: 'User registered successfully', 
        user: safeUserData 
      }, 
      { status: 201 }
    );
  } catch (error: unknown) {
    return handleErrors(error);
  }
}