/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

import { useSnackbar } from '@/components/snackbar';
import { RegisterUserInput } from '@/types/auth/register-user';

import { useCloudinaryUpload } from './useCloudinaryUpload';

interface FileData {
  governmentIdDocument?: File | null;
  policeCheckDocument?: File | null;
  profileImage?: File | null;
}

interface RegistrationState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  data: any | null;
}

interface UseUserRegistrationReturn {
  register: (userData: Omit<RegisterUserInput, 
    'governmentIdDocumentUrl' | 'policeCheckDocumentUrl' | 'image'> & FileData) => Promise<void>;
  registrationState: RegistrationState;
}

export const useUserRegistration = (): UseUserRegistrationReturn => {
  const [registrationState, setRegistrationState] = useState<RegistrationState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  });
  
  const { uploadFile, isUploading } = useCloudinaryUpload();
  const { showSnackbar } = useSnackbar();

  const register = async (userData: Omit<RegisterUserInput, 
    'governmentIdDocumentUrl' | 'policeCheckDocumentUrl' | 'image'> & FileData): Promise<void> => {
    
    // Reset state
    setRegistrationState({
      isLoading: true,
      isSuccess: false,
      error: null,
      data: null,
    });

    try {
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

      // Wait for all file uploads to complete
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

      const response = await axios.post('/api/user/register', registrationData);

      // Set success state
      setRegistrationState({
        isLoading: false,
        isSuccess: true,
        error: null,
        data: response.data,
      });

      // Show success notification
      showSnackbar({
        type: 'success',
        title: 'Registration Successful',
        message: 'Your account has been created successfully.',
      });

    } catch (error) {
      // Handle errors
      let errorMessage = 'An error occurred during registration.';
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        
        // Extract error message from the API response
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

      setRegistrationState({
        isLoading: false,
        isSuccess: false,
        error: errorMessage,
        data: null,
      });

      // Show error notification
      showSnackbar({
        type: 'error',
        title: 'Registration Failed',
        message: errorMessage,
      });
    }
  };

  return {
    register,
    registrationState,
  };
};