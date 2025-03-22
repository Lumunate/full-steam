import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { RegisterUserInput } from '@/types/auth/register-user';

import { useCloudinaryUpload } from './useCloudinaryUpload';

interface FileData {
  governmentIdDocument?: File | null;
  policeCheckDocument?: File | null;
  profileImage?: File | null;
}

type RegistrationInput = Omit<RegisterUserInput, 
  'governmentIdDocumentUrl' | 'policeCheckDocumentUrl' | 'image'> & FileData;

interface RegistrationState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  data: any | null;
}

interface UseUserRegistrationReturn {
  register: (userData: RegistrationInput) => void;
  registrationState: RegistrationState;
}

export const useUserRegistration = (): UseUserRegistrationReturn => {
  const { uploadFile } = useCloudinaryUpload();
  const { showSnackbar } = useSnackbar();

  const registerMutation = useMutation({
    mutationFn: async (userData: RegistrationInput) => {
      const fileUploads = [];
      let governmentIdDocumentUrl = '';
      let policeCheckDocumentUrl = '';
      let imageUrl = '';

      if (userData.governmentIdDocument) {
        fileUploads.push(
          uploadFile(userData.governmentIdDocument).then(url => {
            governmentIdDocumentUrl = url;
          })
        );
      }

      if (userData.policeCheckDocument) {
        fileUploads.push(
          uploadFile(userData.policeCheckDocument).then(url => {
            policeCheckDocumentUrl = url;
          })
        );
      }

      if (userData.profileImage) {
        fileUploads.push(
          uploadFile(userData.profileImage).then(url => {
            imageUrl = url;
          })
        );
      }

      if (fileUploads.length > 0) {
        await Promise.all(fileUploads);
      }

      // Remove file objects from userData
      const { 
        governmentIdDocument, 
        policeCheckDocument, 
        profileImage, 
        ...restUserData 
      } = userData;

      const registrationData: RegisterUserInput = {
        ...restUserData,
        ...(governmentIdDocumentUrl && { governmentIdDocumentUrl }),
        ...(policeCheckDocumentUrl && { policeCheckDocumentUrl }),
        ...(imageUrl && { image: imageUrl }),
      };

      // Submit registration data to API
      const response = await axios.post('/api/user/register', registrationData);

      return response.data;
    },
    onSuccess: (data) => {
      showSnackbar({
        type: 'success',
        title: 'Registration Successful',
        message: 'Your account has been created successfully.',
      });
    },
    onError: (error: Error | AxiosError) => {
      let errorMessage = 'An error occurred during registration.';
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        
        if (axiosError.response?.data) {
          const { message, error: errorTitle } = axiosError.response.data;

          errorMessage = message || errorTitle || 'Registration failed.';
          
          if (axiosError.response.data.details) {
            const details = axiosError.response.data.details;
            const firstError = Object.entries(details)[0];

            if (firstError && Array.isArray(firstError[1])) {
              errorMessage = `${firstError[0]}: ${firstError[1][0]}`;
            }
          }
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showSnackbar({
        type: 'error',
        title: 'Registration Failed',
        message: errorMessage,
      });
    }
  });

  return {
    register: (userData: RegistrationInput) => registerMutation.mutate(userData),
    registrationState: {
      isLoading: registerMutation.isPending,
      isSuccess: registerMutation.isSuccess,
      error: registerMutation.error ? (registerMutation.error as Error).message : null,
      data: registerMutation.data,
    }
  };
};