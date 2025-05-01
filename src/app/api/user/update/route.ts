import { NextRequest, NextResponse } from 'next/server';

import { handleAuthorizeUserSession } from '@/lib/handlers/auth/handle-authorize-user-session';
import handleErrors from '@/lib/handlers/errors';
import { updateUser } from '@/services/UpdateUserService';
import { updateUserSchema } from '@/types/auth/update-user';
export async function PATCH(request: NextRequest) {
  try {
    const user = await handleAuthorizeUserSession();
    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);
    const result = await updateUser(user.id, validatedData);

    return NextResponse.json(result);
  } catch (error: unknown) {
    return handleErrors(error);
  }
}