'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { Session, CreateSessionInput } from '@/types/sessions';

export const useSessions = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const query = useQuery<Session[]>({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await axios.get('/api/sessions');

      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateSessionInput) => {
      const formattedData = {
        ...data,
        bookingDate: data.bookingDate instanceof Date ? data.bookingDate : 
          data.bookingDate ? new Date(data.bookingDate) : undefined
      };

      const response = await axios.post('/api/sessions', formattedData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Session created successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to create session';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<CreateSessionInput> }) => {
      const formattedData = {
        ...data,
        bookingDate: data.bookingDate instanceof Date ? data.bookingDate : 
          data.bookingDate ? new Date(data.bookingDate) : undefined
      };
      const response = await axios.patch(`/api/sessions/${id}`, formattedData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Session updated successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to update session';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/sessions/${id}`);

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Session deleted successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to delete session';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  return {
    sessions: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createSession: createMutation.mutate,
    updateSession: updateMutation.mutate,
    deleteSession: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};