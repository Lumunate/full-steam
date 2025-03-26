import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useSnackbar } from '@/components/snackbar';

interface ToggleApprovalResponse {
  message: string;
  isApproved: boolean;
}

export const useUserApproval = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axios.patch<ToggleApprovalResponse>(
        `/api/user/${userId}/approve`
      );

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      showSnackbar({
        type: 'success',
        title: 'Approval Status Updated',
        message: `User approval status has been changed to ${data.isApproved ? 'approved' : 'unapproved'}.`,
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update approval status';
      
      showSnackbar({
        type: 'error',
        title: 'Approval Update Failed',
        message: errorMessage,
      });
    },
  });
};