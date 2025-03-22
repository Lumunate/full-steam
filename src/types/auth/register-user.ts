import { z } from 'zod';

// Define enum values directly instead of importing from @prisma/client
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Role {
  SERVICE_MASTER = 'SERVICE_MASTER',
  ADMIN = 'ADMIN',
  USER = 'USER',
  HELPER = 'HELPER',
}

export enum PaymentMethod {
  E_TRANSFER = 'E_TRANSFER',
  DIRECT_DEPOSIT = 'DIRECT_DEPOSIT',
}

export const registerUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    message: 'Gender is required',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  
  role: z.enum([
    Role.SERVICE_MASTER,
    Role.ADMIN,
    Role.USER,
    Role.HELPER,
  ]).default(Role.USER),
  
  isApproved: z.boolean().optional(),
  
  // Optional fields
  image: z.string().optional(),
  shortBio: z.string().optional(),
  hourlyRate: z.number().optional(),
  governmentIdDocumentUrl: z.string().optional(),
  policeCheckDocumentUrl: z.string().optional(),
  paymentMethod: z.enum([PaymentMethod.E_TRANSFER, PaymentMethod.DIRECT_DEPOSIT]).optional(),
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
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
// For compatibility with existing code
export type CreateUser = RegisterUserInput;
