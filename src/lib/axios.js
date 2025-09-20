import axios from 'axios';
import { getCookie, logOutHelper } from '@/utils/helper';
// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available (only for requests that need it)
    if (typeof window !== 'undefined') {
      const token = getCookie('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Don't reject requests without tokens - let individual endpoints handle auth
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      ('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        hasAuth: !!config.headers.Authorization,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      ('✅ Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle common error responses
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          if (typeof window !== 'undefined') {
            // logOutHelper();
            window.location.href = '/auth/login';
          }
          break;
        case 403:
          // Forbidden
          console.error('❌ Access forbidden');
          break;
        case 404:
          // Not found
          console.error('❌ Resource not found');
          break;
        case 422:
          // Validation error
          console.error('❌ Validation error:', data);
          break;
        case 500:
          // Server error
          console.error('❌ Internal server error');
          break;
        default:
          console.error('❌ HTTP Error:', status, data);
      }
    } else if (error.request) {
      // Network error
      console.error('❌ Network Error:', error.message);
    } else {
      // Other error
      console.error('❌ Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions for common HTTP methods
export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

// Export the configured axios instance
export default axiosInstance;

// Export specific functions for different use cases
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('access_token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('access_token');
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Helper for handling file uploads
export const uploadFile = (url, file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};
