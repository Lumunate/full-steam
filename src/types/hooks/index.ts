import { RegisterUserInput } from '../auth/register-user';
import { FileData } from '../upload';

export interface UseCloudinaryUploadReturn {
  isUploading: boolean;
  uploadFile: (file: File) => Promise<string>;
  uploadFiles: (files: File[]) => Promise<string[]>;
  error: string | null;
}

export type RegistrationInput = Omit<RegisterUserInput, 
  'governmentIdDocumentUrl' | 'policeCheckDocumentUrl' | 'image'> & FileData;

export interface RegistrationState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  data: any | null;
}

export interface UseUserRegistrationReturn {
  register: (userData: RegistrationInput) => void;
  registrationState: RegistrationState;
}