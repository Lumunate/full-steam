import { Gender, PaymentMethod, UserRole } from '@prisma/client';
import { z } from 'zod';

export const childSchema = z.object({
  name: z.string().min(1, 'Child name is required'),
  age: z.number().min(0, 'Age must be a positive number'),
  specialNotes: z.string().optional(),
});

export const packageSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
  serviceIds: z.array(z.string()).min(1, 'At least one service must be selected for a package'),
});

export const userServiceSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  price: z.number().min(0, 'Price must be a positive number or zero.'),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
});

export const registerUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  postalCode: z.string().min(1, 'Postal code is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.nativeEnum(Gender, {
    message: 'Gender is required',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  saveForFuture: z.boolean().optional().default(false),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
  proStatus: z.boolean().optional().default(false),
  rating: z.number().optional(),
  
  // Optional fields
  country: z.string(),
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

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type CreateUser = RegisterUserInput;