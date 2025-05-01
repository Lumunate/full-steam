'use client';
import axios from 'axios';
import { useState } from 'react';

import { useSnackbar } from '@/components/snackbar';

export const useRecaptcha = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useSnackbar();

  const verifyRecaptcha = async (token: string): Promise<boolean> => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/recaptcha', { token });
      const data = response.data;
      
      if (data.success) {
        setIsVerified(true);

        return true;
      } else {
        const errorMessage = 'reCAPTCHA verification failed. Please try again.';

        setError(errorMessage);
        showSnackbar({
          type: 'error',
          title: 'Verification Failed',
          message: errorMessage,
        });

        return false;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Error verifying reCAPTCHA. Please try again.';

      setError(errorMessage);
      showSnackbar({
        type: 'error',
        title: 'Verification Error',
        message: errorMessage,
      });

      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  const resetRecaptcha = () => {
    setIsVerified(false);
    setError(null);
  };

  return {
    isVerifying,
    isVerified,
    error,
    verifyRecaptcha,
    resetRecaptcha,
  };
};