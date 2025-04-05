'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { SafeUser } from '@/types/auth/UserTypes';

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  const query = useQuery<SafeUser>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await axios.get('/api/user/current');

      return response.data;
    },
    enabled: status === 'authenticated',
  
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    isAuthenticated: status === 'authenticated',
    role: session?.user?.role || null,
  };
};