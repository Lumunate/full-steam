'use client';
import { z } from 'zod';

import { registerUserSchema } from '../auth/register-user';
export const fileDataSchema = z.object({
  governmentIdDocument: z.string().nullable().optional(),
  policeCheckDocument: z.string().nullable().optional(),
  profileImage: z.string().nullable().optional(),
});
export const registrationStateSchema = z.object({
  isLoading: z.boolean(),
  isSuccess: z.boolean(),
  error: z.string().nullable(),
  data: z.any().nullable(),
});
export type FileData = z.infer<typeof fileDataSchema>;
export type RegistrationState = z.infer<typeof registrationStateSchema>;
export type RegistrationInput = Omit<z.infer<typeof registerUserSchema>, 
  'governmentIdDocumentUrl' | 'policeCheckDocumentUrl' | 'image'> & FileData;
export interface UseCloudinaryUploadReturn {
  isUploading: boolean;
  uploadFile: (file: File) => Promise<string>;
  uploadFiles: (files: File[]) => Promise<string[]>;
  error: string | null;
}
export interface UseUserRegistrationReturn {
  register: (userData: RegistrationInput) => void;
  registrationState: RegistrationState;
}