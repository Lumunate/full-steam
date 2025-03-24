
import { UserRole } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { CreateUser, RegisterUserInput } from '@/types/auth/register-user';

type User = {
  id: string;
  [key: string]: any;
};

export async function findUserByEmail(email: string) {
  return prisma.user.findUniqueOrThrow({
    where: { email },
  });
}

export async function createUser(data: CreateUser) {
  const birthDate = new Date(data.dateOfBirth as string);

  return prisma.user.create({
    data: {
      role: data.role || UserRole.USER,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: birthDate,
      gender: data.gender,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address || '',
      city: data.city || '',
      postalCode: data.postalCode || '',
    },
  });
}

export async function registerUser(data: RegisterUserInput) {
  const dateOfBirth = new Date(data.dateOfBirth as string);
  
  const hourlyRate = data.hourlyRate ? Number(data.hourlyRate) : null;

  return prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      password: data.password,
      gender: data.gender,
      dateOfBirth: dateOfBirth,
      role: data.role,
      agreeToTerms: data.agreeToTerms,
      image: data.image,
      shortBio: data.shortBio,
      hourlyRate: hourlyRate,
      governmentIdDocumentUrl: data.governmentIdDocumentUrl,
      policeCheckDocumentUrl: data.policeCheckDocumentUrl,
      paymentMethod: data.paymentMethod,
      eTransferEmail: data.eTransferEmail,
      bankTransitNumber: data.bankTransitNumber,
      bankInstitutionNumber: data.bankInstitutionNumber,
      bankAccountNumber: data.bankAccountNumber,
      additionalInformation: data.additionalInformation,
      paymentCardName: data.paymentCardName,
      paymentCardNumber: data.paymentCardNumber,
      paymentCardExpiry: data.paymentCardExpiry,
      paymentCardCvv: data.paymentCardCvv,
      savePaymentCard: data.savePaymentCard,
      isApproved: data.role !== UserRole.HELPER, 
    },
  });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      gender: true,
      phoneNumber: true,
      email: true,
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

export async function toggleUserApproval(userId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId }
  });
  
  return prisma.user.update({
    where: { id: userId },
    data: { isApproved: !user.isApproved }
  });
}