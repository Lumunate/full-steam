import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { RegisterUserInput } from '@/types/auth/register-user';

interface FileData {
  governmentIdDocument?: string | null;
  policeCheckDocument?: string | null;
  profileImage?: string | null;
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
  const { showSnackbar } = useSnackbar();

  const registerMutation = useMutation({
    mutationFn: async (userData: RegistrationInput) => {
      const { 
        governmentIdDocument, 
        policeCheckDocument, 
        profileImage, 
        ...restUserData 
      } = userData;

      const registrationData: RegisterUserInput = {
        ...restUserData,
        ...(governmentIdDocument && { governmentIdDocumentUrl: governmentIdDocument }),
        ...(policeCheckDocument && { policeCheckDocumentUrl: policeCheckDocument }),
        ...(profileImage && { image: profileImage }),
      };

      const response = await axios.post('/api/user/register', registrationData);

      return response.data;
    },
    onSuccess: () => {
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