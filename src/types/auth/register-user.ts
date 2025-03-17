import { Gender, Role } from '@prisma/client';
import { z } from 'zod';

export const registerUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
    message: 'Gender is required',
  }),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  isAdmin: z.boolean().optional(),
  role: z
    .enum([Role.ADMIN, Role.USER], {
      message: 'Role can only be Admin or Therapist',
    })
    .optional(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
});

export type CreateUser = z.infer<typeof registerUserSchema>;
