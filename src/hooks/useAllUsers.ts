import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { useSnackbar } from '@/components/snackbar';
import { SafeUser } from '@/types/auth/UserTypes';

export const useAllUsers = () => {
  const { data: session } = useSession();
  const { showSnackbar } = useSnackbar();

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SERVICE_MASTER';

  const query = useQuery<SafeUser[]>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/user');

        return response.data.users;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Failed to fetch users';
                            
        showSnackbar({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        
        throw new Error(errorMessage);
      }
    },
    enabled: !!isAdmin,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });

  return {
    users: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    isAdmin,
  };
};