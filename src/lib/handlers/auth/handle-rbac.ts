import { UserRole } from '@prisma/client';

import { handleAuthorizeUserSession } from './handle-authorize-user-session';
import AuthError, { AuthErrorType } from '../errors/types/AuthError';

export async function handleRBAC(allowedRoles: UserRole[]) {
  const user = await handleAuthorizeUserSession();

  if (!allowedRoles.includes(user.role))
    throw new AuthError(AuthErrorType.UNAUTHORIZED, 401);

  return user;
}
