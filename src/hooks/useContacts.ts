'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { IContact } from '@/types/contact';

export const useContacts = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const query = useQuery<IContact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/contact');

        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Failed to fetch contacts';
                            
        showSnackbar({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        
        throw new Error(errorMessage);
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<IContact, 'id' | 'createdAt'>) => {
      const response = await axios.post('/api/contact', data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Contact message submitted successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to submit contact message';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  return {
    contacts: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    submitContact: createMutation.mutate,
    isSubmitting: createMutation.isPending,
  };
};