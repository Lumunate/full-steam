import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import { forgotPassword, resetPassword } from '@/services/AuthService';
import { passwordResetSchema } from '@/types/auth/password-reset';
import { resetPasswordSchema } from '@/types/auth/reset-password';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = resetPasswordSchema.parse(body);

    await forgotPassword(email);

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleErrors(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = passwordResetSchema.parse(body);
    const query = request.nextUrl.searchParams;
    const token = query.get('token');
    const identifier = query.get('identifier');

    const data = await resetPassword(
      token as string,
      identifier as string,
      password,
    );

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
