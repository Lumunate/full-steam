import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { handleAuthorizeUserSession } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { getCurrentUser } from '@/services/UserService';

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession();
    const user=await handleAuthorizeUserSession();
    const result = await getCurrentUser(user.email);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}