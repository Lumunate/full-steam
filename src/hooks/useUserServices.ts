'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import {  UserService, CreateUserServiceInput } from '@/types/services';

export const useUserServices = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const query = useQuery<UserService[]>({
    queryKey: ['userServices'],
    queryFn: async () => {
      const response = await axios.get('/api/user/services');

      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateUserServiceInput) => {
      const formattedData = {
        ...data,
        bookingDate: data.bookingDate instanceof Date ? data.bookingDate : 
          data.bookingDate ? new Date(data.bookingDate) : undefined
      };
      const response = await axios.post('/api/user/services', formattedData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userServices'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Service added successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to add service';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ serviceId, data }: { serviceId: string, data: Partial<Omit<CreateUserServiceInput, 'serviceId'>> }) => {
      const formattedData = {
        ...data,
        bookingDate: data.bookingDate instanceof Date ? data.bookingDate : 
          data.bookingDate ? new Date(data.bookingDate) : undefined
      };
      const response = await axios.patch(`/api/user/services/${serviceId}`, formattedData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userServices'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Service updated successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to update service';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      await axios.delete(`/api/user/services/${serviceId}`);

      return serviceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userServices'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Service removed successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to remove service';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  return {
    userServices: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    addService: createMutation.mutate,
    updateService: updateMutation.mutate,
    removeService: deleteMutation.mutate,
    isAdding: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: deleteMutation.isPending,
  };
};