import { prisma } from '@/lib/prisma';
import {  CreateUserServiceInput } from '@/types/services';

export async function getAllActiveServices() {
  return prisma.service.findMany({
    where: {
      isActive: true
    }
  });
}

export async function findServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id }
  });
}

export async function findServicesByIds(serviceIds: string[]) {
  return prisma.service.findMany({
    where: {
      id: {
        in: serviceIds
      },
      isActive: true
    }
  });
}

export async function getUserServices(userId: string) {
  return prisma.userService.findMany({
    where: {
      userId
    },
    include: {
      service: true,
      session: true
    }
  });
}

export async function createUserService(data: CreateUserServiceInput) {
  const existingUserService = await prisma.userService.findFirst({
    where: {
      userId: data.userId,
      serviceId: data.serviceId
    }
  });

  if (existingUserService) {
    return prisma.userService.update({
      where: { id: existingUserService.id },
      data: {
        price: data.price ? data.price : undefined,
        notes: data.notes,
        sessionId: data.sessionId
      },
      include: {
        service: true,
        session: true
      }
    });
  }

  return prisma.userService.create({
    data: {
      userId: data.userId,
      serviceId: data.serviceId,
      price: data.price ? data.price : undefined,
      notes: data.notes,
      sessionId: data.sessionId
    },
    include: {
      service: true,
      session: true
    }
  });
}

export async function createManyUserServices(items: CreateUserServiceInput[]) {
  return Promise.all(items.map(item => createUserService(item)));
}

export async function updateUserService(userId: string, serviceId: string, data: Partial<Omit<CreateUserServiceInput, 'userId' | 'serviceId'>>) {
  const userService = await prisma.userService.findFirst({
    where: {
      userId,
      serviceId
    }
  });

  if (!userService) {
    throw new Error(`User service not found for userId ${userId} and serviceId ${serviceId}`);
  }

  return prisma.userService.update({
    where: { id: userService.id },
    data,
    include: {
      service: true,
      session: true
    }
  });
}

export async function deleteUserService(userId: string, serviceId: string) {
  const userService = await prisma.userService.findFirst({
    where: {
      userId,
      serviceId
    }
  });

  if (!userService) {
    throw new Error(`User service not found for userId ${userId} and serviceId ${serviceId}`);
  }

  return prisma.userService.delete({
    where: { id: userService.id }
  });
}