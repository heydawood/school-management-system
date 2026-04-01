import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { adminLoginHandler, adminForgotPasswordHandler, adminResetPasswordHandler, verifyOtpHandler, adminResendOtpHandler } from '@/Services/Auth/Auth';
import { AVATAR_KEY, FORGOT_EMAIL_KEY, FORGOT_OTP_KEY, ROLE, TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY } from '@/Utils/Constants';

// initial state
interface AuthState {
  token: string | null;
  role: string | null;
  email: string | null;
  name: string | null;
  otp: string | null;
  avatar: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  role: localStorage.getItem(ROLE) || null,
  email: localStorage.getItem(FORGOT_EMAIL_KEY) || null,
  name: localStorage.getItem(USER_NAME_KEY) || null,
  otp: localStorage.getItem(FORGOT_OTP_KEY) || null,
  avatar: localStorage.getItem(AVATAR_KEY) || null,
  userId: localStorage.getItem(USER_ID_KEY) ? Number(localStorage.getItem(USER_ID_KEY)) : null,
};

// Thunks
export const adminLogin = createAsyncThunk('auth/adminLogin', async (data: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await adminLoginHandler(data.email, data.password);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email: string, { rejectWithValue }) => {
  try {
    const response = await adminForgotPasswordHandler(email);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ email, otp }: { email: string; otp: number }, { rejectWithValue }) => {
  try {
    const response = await verifyOtpHandler({ email, passwordResetCode: Number(otp) });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    { email, password, passwordConfirmation, passwordResetCode }: { email: string; passwordResetCode: number; password: string; passwordConfirmation: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await adminResetPasswordHandler({ email, passwordResetCode, password, passwordConfirmation });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  },
);

export const resendOtp = createAsyncThunk('auth/resendOtp', async ({ email }: { email: string }, { rejectWithValue }) => {
  try {
    const response = await adminResendOtpHandler({ email });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem(TOKEN_KEY, action.payload);
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
      localStorage.setItem(ROLE, action.payload);
    },
    setUserInfo: (state, action: PayloadAction<{ avatar: string; userId: number; name: string }>) => {
      state.avatar = action.payload.avatar;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      localStorage.setItem(AVATAR_KEY, action.payload.avatar);
      localStorage.setItem(USER_NAME_KEY, action.payload.name);
      localStorage.setItem(USER_ID_KEY, action.payload.userId.toString());
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
      state.avatar = null;
      state.userId = null;
      localStorage.removeItem(AVATAR_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_NAME_KEY);
      
      localStorage.removeItem(ROLE);  //i added this to clear role
      state.role = null; //i added this to clear role
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      localStorage.setItem(FORGOT_EMAIL_KEY, action.payload);
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
      localStorage.setItem(FORGOT_OTP_KEY, action.payload);
    },
    clearForgotFlow: (state) => {
      state.email = null;
      state.otp = null;
      localStorage.removeItem(FORGOT_EMAIL_KEY);
      localStorage.removeItem(FORGOT_OTP_KEY);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(forgotPassword.fulfilled, (state, action) => {
  //       state.email = action.payload;
  //       localStorage.setItem(FORGOT_EMAIL_KEY, action.payload);
  //     })
  //     .addCase(verifyOtp.fulfilled, (state, action) => {
  //       state.otp = action.payload;
  //       localStorage.setItem(FORGOT_OTP_KEY, action.payload);
  //     })
  //     .addCase(resetPassword.fulfilled, (state) => {
  //       // after reset, clear everything
  //       state.email = null;
  //       state.otp = null;
  //       localStorage.removeItem(FORGOT_EMAIL_KEY);
  //       localStorage.removeItem(FORGOT_OTP_KEY);
  //     });
  // },
});

export const { setToken, removeToken, setUserInfo, setEmail, setOtp, clearForgotFlow, setRole } = authSlice.actions;
export default authSlice.reducer;
