import { hash } from 'bcryptjs';

import AuthError, {
  AuthErrorType,
} from '@/lib/handlers/errors/types/AuthError';
import {
  createVerificationToken,
  validateVerificationToken,
} from '@/repository/AuthRepository';
import { findUserByEmail, updatePassword } from '@/repository/UserRepository';

export async function forgotPassword(email: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AuthError(AuthErrorType.USER_NOT_FOUND, 404);
  }

  const resetToken = await createVerificationToken(
    `${user.id}:PASSWORD_RESET_TOKEN`,
  );

  await sendPasswordResetEmail(email, resetToken);
}

export async function resetPassword(
  token: string,
  identifier: string,
  password: string,
) {
  const verifiedToken = await validateVerificationToken(identifier, token);
  const hashedPassword = await getHashedPassword(password);

  const user = await updatePassword(
    identifier?.split(':')[0] ?? '',
    hashedPassword,
    verifiedToken.id,
  );

  if (!user) {
    throw new AuthError(AuthErrorType.USER_NOT_FOUND, 404);
  }

  return user;
}

async function sendPasswordResetEmail(_email: string, _resetToken: string) {
  // TODO: send password reset emails
}

async function getHashedPassword(password: string) {
  return await hash(password, 10);
}
