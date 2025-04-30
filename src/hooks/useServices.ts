'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { Service } from '@/types/services';

export const useServices = () => {
  const { showSnackbar } = useSnackbar();

  const query = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/services');

        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Failed to fetch services';
        
        showSnackbar({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        
        throw new Error(errorMessage);
      }
    }
  });

  return {
    services: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
};