'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';

export interface AdminStats {
  activeUsers: number;
  totalEarnings: number;
  platformCommissions: number;
  applicationRequests: number;
  hoursWorked: number;
}

export const useAdminStats = () => {
  const { showSnackbar } = useSnackbar();

  return useQuery<AdminStats>({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/admin/stats');

        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Failed to fetch admin statistics';
        
        showSnackbar({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        
        throw new Error(errorMessage);
      }
    },
  });
};