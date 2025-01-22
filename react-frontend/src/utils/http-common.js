import axios from 'axios';

const apiClient = axios.create({
  baseURL:  `${import.meta.env.VITE_BASE_API_URL}/api`,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Add the Authorization header to every request
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
    return config;
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      const networkError = new Error('Network Error. Please try again.');
      networkError.isNetworkError = true;
      throw networkError;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
