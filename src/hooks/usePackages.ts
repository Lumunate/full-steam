'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { Package, CreatePackageInput } from '@/types/packages';

export const usePackages = () => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const query = useQuery<Package[]>({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await axios.get('/api/packages');

      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreatePackageInput) => {
      const response = await axios.post('/api/packages', data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Package created successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to create package';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<CreatePackageInput> }) => {
      const response = await axios.patch(`/api/packages/${id}`, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Package updated successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to update package';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/packages/${id}`);

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      showSnackbar({
        type: 'success',
        title: 'Success',
        message: 'Package deleted successfully',
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Failed to delete package';
      
      showSnackbar({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  });

  return {
    packages: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createPackage: createMutation.mutate,
    updatePackage: updateMutation.mutate,
    deletePackage: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};