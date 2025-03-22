import { AuthErrorType } from '@/lib/handlers/errors';
import AuthError from '@/lib/handlers/errors/types/AuthError';
import { prisma } from '@/lib/prisma';

export async function createVerificationToken(identifier: string) {
  const token = Math.random().toString(36).substring(2, 15);

  const verificationRequest = await prisma.verificationRequest.create({
    data: {
      identifier,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  return verificationRequest.token;
}

export async function validateVerificationToken(
  identifier: string,
  token: string,
) {
  const verificationRequest = await prisma.verificationRequest.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!verificationRequest)
    throw new AuthError(AuthErrorType.TOKEN_INVALID, 401);

  if (verificationRequest.expires < new Date())
    throw new AuthError(AuthErrorType.TOKEN_EXPIRED, 401);

  return verificationRequest;
}
