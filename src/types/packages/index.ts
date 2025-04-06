import { z } from 'zod';

import { serviceSchema } from '../services';
import { sessionSchema } from '../sessions';

export const packageServiceSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  serviceId: z.string(),
  service: serviceSchema,
});

export const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  userId: z.string(),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
  session: sessionSchema.optional(),
  packageServices: z.array(packageServiceSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createPackageInputSchema = z.object({
  name: z.string(),
  price: z.number(),
  userId: z.string(),
  notes: z.string().optional(),
  sessionId: z.string().optional(),
  serviceIds: z.array(z.string()),
});

export const createPackageApiSchema = createPackageInputSchema
  .omit({ userId: true }) 
  .extend({
    price: z.union([z.string(), z.number()]),
  });

export type PackageService = z.infer<typeof packageServiceSchema>;
export type Package = z.infer<typeof packageSchema>;
export type CreatePackageInput = z.infer<typeof createPackageInputSchema>;
export type CreatePackageInputFields = z.infer<typeof createPackageApiSchema>;