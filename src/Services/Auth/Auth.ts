import api from '../Api';

// Login Admin Function
export const adminLoginHandler = async (email: string, password: string) => {
  return api.post('/v1/admins/login', { email, password });
};

// Forgot Password Admin Function
export const adminForgotPasswordHandler = async (email: string) => {
  return api.post('admin/auth/forget_password', { email });
};

// Reset Password Admin Function
export const adminResetPasswordHandler = async (data: any) => {
  return api.post('admin/auth/reset_password', data);
};

// Verify OTP Admin Function
export const verifyOtpHandler = async (data: any) => {
  return api.post('admin/auth/verify_otp', data);
};

// Resend OTP Admin Function
export const adminResendOtpHandler = async (data: any) => {
  return api.post('admin/auth/resend_otp', data);
};
