'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { IFeedback } from '@/types/feedback';

export const useFeedback = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const query = useQuery<IFeedback[]>({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/feedback');

        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Failed to fetch feedback';
                            
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
    mutationFn: async (data: Omit<IFeedback, 'id' | 'createdAt'>) => {
      const response = await axios.post('/api/feedback', data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Feedback submitted successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to submit feedback';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  return {
    feedbacks: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    submitFeedback: createMutation.mutate,
    isSubmitting: createMutation.isPending,
  };
};