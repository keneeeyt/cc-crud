import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useApiMutation = (apiCall, options = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: apiCall, // Correct use of mutationFn
    ...options,           // Include other options like onError, onSuccess, etc.
    onError: (error) => {
      if (error.isNetworkError) {
        navigate('/network-error'); // Redirect to network error page
      } else {
        console.error('API Error:', error.response?.data || error.message);
      }

      // Call additional error handlers if provided
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};
