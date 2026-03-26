import api from './Api';
// import { removeToken } from '../Redux/Auth/AuthSlice';

// Dynamic function for setting up the interceptor
export const attachInterceptor = (dispatch: any, navigate: any) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.error === 'Unauthorized' && error?.statusCode === 401) {
        console.error('Token expired or unauthorized');
        // Dispatch Redux action to remove token
        // dispatch(removeToken());
        // Clear local storage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
      }
      return Promise.reject(error);
    },
  );
};
