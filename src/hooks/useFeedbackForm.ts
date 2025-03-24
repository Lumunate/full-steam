import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IFeedback } from '../types/feedback';
export const useSubmitFeedbackForm = () => {
  return useMutation({
    mutationFn: async (formData: IFeedback) => {

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return response.json();
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
const response = await axios('/api/feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});