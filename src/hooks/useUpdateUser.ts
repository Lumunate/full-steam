'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { UpdateUserInput } from '@/types/auth/update-user';
import { SafeUser } from '@/types/auth/UserTypes';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (userData: UpdateUserInput): Promise<SafeUser> => {
      const response = await axios.patch<SafeUser>('/api/user/update', userData);
      
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['userServices'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      
      showSnackbar({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully',
      });
      
      return data;
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update profile';
      
      showSnackbar({
        type: 'error',
        title: 'Update Failed',
        message: errorMessage,
      });
      
      throw error;
    },
  });
};