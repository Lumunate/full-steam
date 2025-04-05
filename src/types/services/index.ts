'use client';
import { z } from 'zod';

import { sessionSchema } from '../sessions';

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export const userServiceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  serviceId: z.string(),
  price: z.number(),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
  service: serviceSchema,
  session: sessionSchema.optional(),
  createdAt: z.string(),
});

export const createUserServiceInputSchema = z.object({
  userId: z.string(),
  serviceId: z.string(),
  price: z.union([z.string(), z.number()]).optional(),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
});
export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type Service = z.infer<typeof serviceSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UserService = z.infer<typeof userServiceSchema>;
export type CreateUserServiceInput = z.infer<typeof createUserServiceInputSchema>;