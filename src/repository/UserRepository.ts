import { Role, User } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { CreateUser } from '@/types/auth/register-user';

export async function findUser(id: string) {
  return prisma.user.findUniqueOrThrow({
    where: { id },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUniqueOrThrow({
    where: { username },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUniqueOrThrow({
    where: { email },
  });
}

export async function createUser(data: CreateUser) {
  const birthDate = new Date(data.birthDate);

  return prisma.user.create({
    data: {
      role: data.isAdmin ? Role.ADMIN : Role.USER,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: birthDate,
      gender: data.gender,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      username: data.username,
    },
  });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      birthDate: true,
      gender: true,
      phoneNumber: true,
      email: true,
      username: true,
      role: true,
    },
  });
}

export async function updatePassword(
  userId: string,
  hashedPassword: string,
  tokenId: string,
) {
  const [updatedUser] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    }),
    prisma.verificationRequest.delete({
      where: { id: tokenId },
    }),
  ]);

  return updatedUser;
}

export const updateUser = async (userId: string, data: Partial<User>) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};
