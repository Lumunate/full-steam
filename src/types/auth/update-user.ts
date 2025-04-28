import { Gender, PaymentMethod, UserRole } from '@prisma/client';
import { z } from 'zod';

import { childSchema, packageSchema, userServiceSchema } from './register-user';

export const updateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  address: z.string().min(1, 'Address is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
  postalCode: z.string().min(1, 'Postal code is required').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  gender: z.nativeEnum(Gender, {
    message: 'Gender is required',
  }).optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required').optional(),
  saveForFuture: z.boolean().optional(),
  role: z.nativeEnum(UserRole).optional(),
  proStatus: z.boolean().optional(),
  rating: z.number().optional(),
  
  country: z.string().optional(),
  image: z.string().optional(),
  shortBio: z.string().optional(),
  hourlyRate: z.number().optional(),
  governmentIdDocumentUrl: z.string().optional(),
  policeCheckDocumentUrl: z.string().optional(),
  firstAidCertificate: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
  eTransferEmail: z.string().email().optional(),
  bankTransitNumber: z.string().optional(),
  bankInstitutionNumber: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  additionalInformation: z.string().optional(),
  paymentCardName: z.string().optional(),
  paymentCardNumber: z.string().optional(),
  paymentCardExpiry: z.string().optional(),
  paymentCardCvv: z.string().optional(),
  savePaymentCard: z.boolean().optional(),
  
  children: z.array(childSchema).optional(),
  serviceIds: z.array(z.string()).optional(),
  userServices: z.array(userServiceSchema).optional(), 
  packages: z.array(packageSchema).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;