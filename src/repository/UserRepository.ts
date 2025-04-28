import { UserRole } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { RegisterUserInput } from '@/types/auth/register-user';

type User = {
  id: string;
  [key: string]: any;
};

const templateUserInclude = {
  children: true,
  userServices: {
    include: {
      service: true,
      session: true
    }
  },
  packages: {
    include: {
      packageServices: {
        include: {
          service: true
        }
      },
      session: true
    }
  }
};

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: templateUserInclude
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUniqueOrThrow({
    where: { email },
    include: templateUserInclude
  });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    include: templateUserInclude
  });
}

export async function registerUser(data: RegisterUserInput) {
  const dateOfBirth = new Date(data.dateOfBirth as string);
  const hourlyRate = data.hourlyRate ? Number(data.hourlyRate) : null;

  return prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      password: data.password,
      gender: data.gender,
      dateOfBirth: dateOfBirth,
      role: data.role,
      proStatus: data.proStatus || false,
      rating: data.rating,
      saveForFuture: data.saveForFuture || false,
      agreeToTerms: data.agreeToTerms,
      image: data.image,
      shortBio: data.shortBio,
      hourlyRate: hourlyRate,
      governmentIdDocumentUrl: data.governmentIdDocumentUrl,
      policeCheckDocumentUrl: data.policeCheckDocumentUrl,
      firstAidCertificate: data.firstAidCertificate,
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