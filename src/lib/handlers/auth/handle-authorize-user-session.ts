import { getServerSession } from 'next-auth';

import { findUserByEmail } from '@/repository/UserRepository';

import AuthError, { AuthErrorType } from '../errors/types/AuthError';

export async function handleAuthorizeUserSession() {
  const session = await getServerSession();

  if (!session?.user?.email)
    throw new AuthError(AuthErrorType.TOKEN_INVALID, 401);

  const user = await findUserByEmail(session.user.email);

  if (!user) throw new AuthError(AuthErrorType.USER_NOT_FOUND, 401);
  else if (user.isBlocked || user.isDeleted)
    throw new AuthError(AuthErrorType.USER_DISABLED, 401);

  return user;
}