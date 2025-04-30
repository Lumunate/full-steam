'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';
import { SafeUser } from '@/types/auth/UserTypes';
const validateImageUrl = (url: string | null | undefined): string | null => {
  if (!url || url.trim() === '') return null;
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url);

      return url;
    }
    if (url.startsWith('/')) {
      return url;
    }

    return null;
  } catch {
    return null;
  }
};

export const useHelpers = () => {
  const { showSnackbar } = useSnackbar();
  const query = useQuery<SafeUser[]>({
    queryKey: ['helpers'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/user');

        return response.data
          .filter((user: SafeUser) => user.role === 'HELPER')
          .map((helper: SafeUser) => ({
            ...helper,
            image: helper.image ? validateImageUrl(helper.image) : null
          }));
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Failed to fetch helpers';

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
    helpers: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
};