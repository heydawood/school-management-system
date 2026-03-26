import axios from 'axios';
import { attachInterceptor } from './InterceptorManager';
import { TOKEN_KEY } from '@/Utils/Constants';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Keep full error object
    return Promise.reject(error?.response?.data || error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const systemErrorCode = error?.response?.data?.systemErrorCode;

    if (error?.response?.status === 401) {
      console.error('Token expired or unauthorized');
    }

    const clonedData = { ...data };

    if (Array.isArray(clonedData.message)) {
      clonedData.message = clonedData.message[0];
    }

    return Promise.reject(clonedData);
  },
);

// Attach dynamic interceptor logic
export const setupInterceptor = (dispatch: any, navigate: any) => {
  attachInterceptor(dispatch, navigate);
};

export default api;
