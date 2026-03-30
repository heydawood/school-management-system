import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { adminForgotPasswordHandler, adminResetPasswordHandler, verifyOtpHandler, adminResendOtpHandler } from '@/Services/Auth/Auth';
import { AVATAR_KEY, FORGOT_EMAIL_KEY, FORGOT_OTP_KEY, ROLE, TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY } from '@/Utils/Constants';
import { studentLoginHandler } from '@/Services/AuthStudent/AuthStudent';

// initial state
interface TeacherAuthState {
  token: string | null;
  role: string | null;
  email: string | null;
  name: string | null;
  otp: string | null;
  avatar: string | null;
  userId: number | null;
}

const initialState: TeacherAuthState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  role: localStorage.getItem(ROLE) || null,
  email: localStorage.getItem(FORGOT_EMAIL_KEY) || null,
  name: localStorage.getItem(USER_NAME_KEY) || null,
  otp: localStorage.getItem(FORGOT_OTP_KEY) || null,
  avatar: localStorage.getItem(AVATAR_KEY) || null,
  userId: localStorage.getItem(USER_ID_KEY) ? Number(localStorage.getItem(USER_ID_KEY)) : null,
};

// Thunks
export const studentLogin = createAsyncThunk('auth/studentLogin', async (data: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await studentLoginHandler(data.email, data.password);
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
const authStudentSlice = createSlice({
  name: 'studentTeacher',
  initialState,
  reducers: {

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem(TOKEN_KEY, action.payload);
    },

    setRole: (state, action: PayloadAction<string>) => { //i added this
      state.role = action.payload;
      localStorage.setItem(ROLE, action.payload);
    },
    
    setTeacherInfo: (state, action: PayloadAction<{ avatar: string; userId: number; name: string }>) => {
      state.avatar = action.payload.avatar;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      localStorage.setItem(AVATAR_KEY, action.payload.avatar);
      localStorage.setItem(USER_NAME_KEY, action.payload.name);
      localStorage.setItem(USER_ID_KEY, action.payload.userId.toString());
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
});

export const { setToken, setTeacherInfo, setEmail, setOtp, clearForgotFlow, setRole } = authStudentSlice.actions;
export default authStudentSlice.reducer;