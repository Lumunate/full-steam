import { UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

import * as ChildRepository from '@/repository/ChildRepository';
import * as ServiceRepository from '@/repository/ServiceRepository';
import * as UserRepository from '@/repository/UserRepository';
import { UpdateUserInput } from '@/types/auth/update-user';
import { SafeUser } from '@/types/auth/UserTypes';

import * as PackageService from './PackageService';
export async function updateUser(userId: string, userData: UpdateUserInput): Promise<SafeUser> {
  const {
    password,
    children,
    userServices,
    serviceIds,
    packages,
    ...basicUserData
  } = userData;
  const updatedUser = await UserRepository.updateUser(userId, {
    ...basicUserData,
    ...(password && { password: await hash(password, 10) }),
  });

  if (children !== undefined) {
    await ChildRepository.deleteChildrenByUserId(userId);
    if (children.length > 0 && updatedUser.role === UserRole.USER) {
      await ChildRepository.createManyChildren(
        children.map(child => ({
          userId,
          name: child.name,
          age: child.age,
          specialNotes: child.specialNotes
        }))
      );
    }
  }
  if (userServices !== undefined) {
    const existingServices = await ServiceRepository.getUserServices(userId);

    if (userServices.length > 0 && 
        (updatedUser.role === UserRole.HELPER || updatedUser.role === UserRole.USER)) {
      await Promise.all(
        userServices.map(userService => {
          return ServiceRepository.createUserService({
            userId,
            serviceId: userService.serviceId,
            price: typeof userService.price === 'string' ? 
              parseFloat(userService.price) : userService.price,
            notes: userService.notes,
            sessionId: userService.sessionId
          });
        })
      );
      const newServiceIds = userServices.map(s => s.serviceId);

      await Promise.all(
        existingServices
          .filter(s => !newServiceIds.includes(s.serviceId))
          .map(s => ServiceRepository.deleteUserService(userId, s.serviceId))
      );
    } else if (userServices.length === 0) {
      await Promise.all(
        existingServices.map(s => ServiceRepository.deleteUserService(userId, s.serviceId))
      );
    }
  } else if (serviceIds !== undefined) {
    const existingServices = await ServiceRepository.getUserServices(userId);
    const hourlyRate = basicUserData.hourlyRate ? Number(basicUserData.hourlyRate) : undefined;

    if (serviceIds.length > 0 && 
        (updatedUser.role === UserRole.HELPER || updatedUser.role === UserRole.USER)) {
      await Promise.all(
        serviceIds.map(serviceId => {
          return ServiceRepository.createUserService({
            userId,
            serviceId,
            price: hourlyRate
          });
        })
      );
      const newServiceIds = serviceIds;

      await Promise.all(
        existingServices
          .filter(s => !newServiceIds.includes(s.serviceId))
          .map(s => ServiceRepository.deleteUserService(userId, s.serviceId))
      );
    }
  }
  if (packages !== undefined) {
    const existingPackages = await PackageService.getUserPackages(userId);

    if (packages.length > 0 && 
        (updatedUser.role === UserRole.HELPER || updatedUser.role === UserRole.USER)) {
      await PackageService.createManyPackages(
        packages.map(pkg => ({
          name: pkg.name,
          price: typeof pkg.price === 'string' ? parseFloat(pkg.price) : pkg.price,
          userId,
          notes: pkg.notes,
          sessionId: pkg.sessionId,
          serviceIds: pkg.serviceIds || []
        }))
      );
      const newPackageNames = packages.map(p => p.name);

      await Promise.all(
        existingPackages
          .filter(p => !newPackageNames.includes(p.name))
          .map(p => PackageService.deletePackage(p.id))
      );
    } else if (packages.length === 0) {
      await Promise.all(
        existingPackages.map(p => PackageService.deletePackage(p.id))
      );
    }
  }
  const updatedUserWithRelations = await UserRepository.findUserById(userId);
  const { 
    ...safeUserData 
  } = updatedUserWithRelations;
  const safeUser: SafeUser = {
    ...safeUserData
  };

  return safeUser;
}