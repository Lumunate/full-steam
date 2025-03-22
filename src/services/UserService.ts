import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash } from 'bcryptjs';

import AuthError, { AuthErrorType } from '@/lib/handlers/errors/types/AuthError';
import ValidationError from '@/lib/handlers/errors/types/ValidationError';
import * as UserRepository from '@/repository/UserRepository';
import { RegisterUserInput, Role } from '@/types/auth/register-user';

export async function registerUser(userData: RegisterUserInput) {
  try {
    try {
      await UserRepository.findUserByEmail(userData.email);
      throw new AuthError(AuthErrorType.EMAIL_ALREADY_EXISTS, 409);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code !== 'P2025') {
          throw error;
        }
        // P2025 means not found
      } else if (error instanceof AuthError) {
        throw error;
      }
    }
    
    if (userData.role === Role.SERVICE_MASTER || userData.role === Role.HELPER) {
      if (!userData.governmentIdDocumentUrl) {
        throw new ValidationError('Government ID document is required for this role');
      }
      
      if (!userData.policeCheckDocumentUrl) {
        throw new ValidationError('Police check document is required for this role');
      }
    }
    
    // Hash the password
    const hashedPassword = await hash(userData.password, 10);
    
    // Set isApproved based on role - HELPER role requires approval
    const isApproved = userData.role !== Role.HELPER;
    
    // Create the user with hashed password and approval status
    const user = await UserRepository.registerUser({
      ...userData,
      password: hashedPassword,
      isApproved,
    });
    
    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle unique constraint violations
      if (error.code === 'P2002') {
        const field = error.meta?.target as string[];
        const fieldName = field?.[0] || 'field';

        throw new ValidationError(`User with this ${fieldName} already exists`);
      }
      
      throw error;
    }
    
    throw error;
  }
}