import { NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import { makeUser } from '@/services/UserService';
import { registerUserSchema } from '@/types/auth/register-user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = registerUserSchema.parse(body);

    const user = await makeUser(validatedBody);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}
