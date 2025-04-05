'use client';
import { z } from 'zod';

export const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createSessionInputSchema = z.object({
  name: z.string(),
  duration: z.union([z.string(), z.number()]),
});

export type Session = z.infer<typeof sessionSchema>;
export type CreateSessionInput = z.infer<typeof createSessionInputSchema>;