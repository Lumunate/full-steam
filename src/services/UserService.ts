import { UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

import AuthError, { AuthErrorType } from '@/lib/handlers/errors/types/AuthError';
import ValidationError from '@/lib/handlers/errors/types/ValidationError';
import { findUserByEmail, updateUser } from '@/repository/UserRepository';
import * as UserRepository from '@/repository/UserRepository';
import { RegisterUserInput } from '@/types/auth/register-user';

export async function registerUser(userData: RegisterUserInput) {
  try {
    await UserRepository.findUserByEmail(userData.email);
    throw new AuthError(AuthErrorType.EMAIL_ALREADY_EXISTS, 409);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
  }
  
  if (userData.role === UserRole.SERVICE_MASTER || userData.role === UserRole.HELPER) {
    if (!userData.governmentIdDocumentUrl) {
      throw new ValidationError('Government ID document is required for this role');
    }
    
    if (!userData.policeCheckDocumentUrl) {
      throw new ValidationError('Police check document is required for this role');
    }
  }
  
  const hashedPassword = await hash(userData.password, 10);
  
  const isApproved = userData.role !== UserRole.HELPER;
  
  // Create the user
  const user = await UserRepository.registerUser({
    ...userData,
    password: hashedPassword,
    isApproved,
  });
  
  return user;
}
export async function toggleUserApproval(userId: string) {
  const user = await findUserByEmail(userId);

  return updateUser(userId, {
    isApproved: !user.isApproved,
  });
}