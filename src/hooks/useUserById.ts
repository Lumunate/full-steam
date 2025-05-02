'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserWithAllData } from '@/repository/UserRepository';

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async (): Promise<UserWithAllData> => {
      const response = await axios.get(`/api/user/${userId}`);

      return response.data;
    },
  });
};
