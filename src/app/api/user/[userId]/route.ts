import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import handleErrors from '@/lib/handlers/errors';
import AuthError, {
  AuthErrorType,
} from '@/lib/handlers/errors/types/AuthError';
import { getUserById } from '@/services/UserService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new AuthError(AuthErrorType.UNAUTHORIZED, 401);
    }

    const { userId } = await params;
    const result = await getUserById(userId);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
