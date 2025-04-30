import { UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

import handleErrors from '@/lib/handlers/errors';
import * as ChildRepository from '@/repository/ChildRepository';
import * as ServiceRepository from '@/repository/ServiceRepository';
import * as UserRepository from '@/repository/UserRepository';
import { RegisterUserInput } from '@/types/auth/register-user';
import { SafeUser } from '@/types/auth/UserTypes';

import * as PackageService from './PackageService';
export async function registerUser(userData: RegisterUserInput) {
  const hashedPassword = await hash(userData.password, 10);
  const user = await UserRepository.registerUser({
    ...userData,
    password: hashedPassword,
  });

  if (userData.children && userData.children.length > 0 && userData.role === UserRole.USER) {
    await ChildRepository.createManyChildren(
      userData.children.map(child => ({
        userId: user.id,
        name: child.name,
        age: child.age,
        specialNotes: child.specialNotes
      }))
    );
  }
  if (userData.userServices && userData.userServices.length > 0 &&
      (userData.role === UserRole.HELPER || userData.role === UserRole.USER)) {
    try {
      await ServiceRepository.createManyUserServices(
        userData.userServices.map(userService => ({
          userId: user.id,
          serviceId: userService.serviceId,
          price: typeof userService.price === 'string' ? parseFloat(userService.price) : userService.price,
          notes: userService.notes,
          sessionId: userService.sessionId
        }))
      );
    } catch (error) {
      handleErrors(error);
    }
  } else if (userData.serviceIds && userData.serviceIds.length > 0 && 
      (userData.role === UserRole.HELPER || userData.role === UserRole.USER)) {
    await ServiceRepository.createManyUserServices(
      userData.serviceIds.map(serviceId => ({
        userId: user.id,
        serviceId,
        price: userData.hourlyRate ? Number(userData.hourlyRate) : 0
      }))
    );
  }
  if (userData.packages && userData.packages.length > 0 && 
      (userData.role === UserRole.HELPER || userData.role === UserRole.USER)) {
    try {
      await PackageService.createManyPackages(
        userData.packages.map(pkg => ({
          name: pkg.name,
          price: typeof pkg.price === 'string' ? parseFloat(pkg.price) : pkg.price,
          userId: user.id,
          notes: pkg.notes,
          sessionId: pkg.sessionId,
          serviceIds: pkg.serviceIds || []
        }))
      );
    } catch (error) {
      handleErrors(error);
    }
  }

  return user;
}
export async function getUserById(userId: string) {
  return UserRepository.findUserById(userId);
}
export async function getUserByEmail(email: string) {
  return UserRepository.findUserByEmail(email);
}
export async function getAllUsers() {
  const users = await UserRepository.findAllUsers();

  return  users ;
}
export async function getCurrentUser(email: string) {
  const user = await getUserByEmail(email);
  const { 
    password, 
    paymentCardNumber, 
    paymentCardCvv, 
    bankAccountNumber,
    ...safeUserData 
  } = user;
  const safeUser: SafeUser = {
    ...safeUserData
  };

  return  safeUser ;
}

export async function toggleUserApproval(userId: string) {
  const updatedUser = await UserRepository.toggleUserApproval(userId);

  return updatedUser
  ;
}

export async function checkFieldAvailability(field: 'username' | 'email', value: string): Promise<boolean> {
  return UserRepository.checkAvailability(field, value);
}