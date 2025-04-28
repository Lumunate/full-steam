import { UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

import * as ChildRepository from '@/repository/ChildRepository';
import * as PackageRepository from '@/repository/PackageRepository';
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
    dateOfBirth,
    ...basicUserData
  } = userData;

  const updateData  = {
    ...basicUserData,
    ...(password && { password: await hash(password, 10) }),
    ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
  };

  const updatedUser = await UserRepository.updateUser(userId, updateData);
  
  if (children !== undefined) {
    if (children.length > 0 && updatedUser.role === UserRole.USER) {
      const existingChildren = await ChildRepository.getChildrenByUserId(userId);

      for (const child of children) {
        const existingChild = existingChildren.find(ec => ec.name === child.name);

        if (existingChild) {
          if (existingChild.age !== child.age || existingChild.specialNotes !== child.specialNotes) {
            await ChildRepository.updateChild(existingChild.id, {
              age: child.age,
              specialNotes: child.specialNotes
            });
          }
        } else {
          await ChildRepository.createChild({
            userId,
            name: child.name,
            age: child.age,
            specialNotes: child.specialNotes
          });
        }
      }
      const childNamesToKeep = children.map(c => c.name);
      const childrenToRemove = existingChildren.filter(ec => !childNamesToKeep.includes(ec.name));

      for (const childToRemove of childrenToRemove) {
        await ChildRepository.deleteChild(childToRemove.id);
      }
    } else if (children.length === 0) {
      await ChildRepository.deleteChildrenByUserId(userId);
    }
  }
  if (userServices !== undefined) {
    const existingServices = await ServiceRepository.getUserServices(userId);

    if (userServices.length > 0 && 
      (updatedUser.role === UserRole.HELPER || updatedUser.role === UserRole.USER)) {
      for (const userService of userServices) {
        const existingService = existingServices.find(es => es.serviceId === userService.serviceId);

        if (existingService) {
          if (+existingService.price !== +userService.price || 
            existingService.notes !== userService.notes ||
            existingService.sessionId !== userService.sessionId) {
            await ServiceRepository.updateUserService(userId, userService.serviceId, {
              price: +userService.price,
              notes: userService.notes,
              sessionId: userService.sessionId
            });
          }
        } else {
          await ServiceRepository.createUserService({
            userId,
            serviceId: userService.serviceId,
            price: +userService.price,
            notes: userService.notes,
            sessionId: userService.sessionId
          });
        }
      }
      const newServiceIds = userServices.map(s => s.serviceId);
      const servicesToDelete = existingServices
        .filter(s => !newServiceIds.includes(s.serviceId))
        .map(s => s.id);

      if (servicesToDelete.length > 0) {
        await ServiceRepository.deleteManyUserServices(servicesToDelete);
      }
    } else if (userServices.length === 0) {
      await ServiceRepository.deleteAllUserServices(userId);
    }
  }
  else if (serviceIds !== undefined) {
    const existingServices = await ServiceRepository.getUserServices(userId);
    const hourlyRate = basicUserData.hourlyRate ? Number(basicUserData.hourlyRate) : undefined;

    if (serviceIds.length > 0 && 
      (updatedUser.role === UserRole.HELPER || updatedUser.role === UserRole.USER)) {
      for (const serviceId of serviceIds) {
        const existingService = existingServices.find(s => s.serviceId === serviceId);

        if (existingService) {
          if (hourlyRate !== undefined && +existingService.price !== hourlyRate) {
            await ServiceRepository.updateUserService(userId, serviceId, {
              price: hourlyRate
            });
          }
        } else {
          await ServiceRepository.createUserService({
            userId,
            serviceId,
            price: hourlyRate
          });
        }
      }
      const servicesToDeleteIds = existingServices
        .filter(s => !serviceIds.includes(s.serviceId))
        .map(s => s.id);

      if (servicesToDeleteIds.length > 0) {
        await ServiceRepository.deleteManyUserServices(servicesToDeleteIds);
      }
    } else if (serviceIds.length === 0) {
      await ServiceRepository.deleteAllUserServices(userId);
    }
  }
  if (packages !== undefined) {
    const existingPackages = await PackageService.getUserPackages(userId);

    if (packages.length > 0 && 
      (updatedUser.role === UserRole.HELPER || updatedUser.role === UserRole.USER)) {
      for (const pkg of packages) {
        const existingPackage = existingPackages.find(ep => ep.name === pkg.name);

        if (existingPackage) {
          await PackageRepository.updatePackage(existingPackage.id, {
            name: pkg.name,
            price: +pkg.price,
            notes: pkg.notes,
            sessionId: pkg.sessionId,
            serviceIds: pkg.serviceIds || []
          });
        } else {
          await PackageRepository.createPackage({
            name: pkg.name,
            price: +pkg.price,
            userId,
            notes: pkg.notes,
            sessionId: pkg.sessionId,
            serviceIds: pkg.serviceIds || []
          });
        }
      }
      const packageNamesToKeep = packages.map(p => p.name);
      const packagesToDelete = existingPackages
        .filter(p => !packageNamesToKeep.includes(p.name))
        .map(p => p.id);

      if (packagesToDelete.length > 0) {
        await PackageRepository.deleteManyPackages(packagesToDelete);
      }
    } else if (packages.length === 0) {
      await PackageRepository.deleteAllPackages(userId);
    }
  }
  const updatedUserWithRelations = await UserRepository.findUserById(userId);
  const { ...safeUserData } = updatedUserWithRelations;
  const safeUser: SafeUser = { ...safeUserData };

  return safeUser;
}