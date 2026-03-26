import { customToast } from '@/Common/Components/ShowToast';
import { getUserProfileHandler, updateUserStatusHandler } from '@/Services/UserProfile/UserProfile';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Calls
export const getUserProfile = createAsyncThunk('getUserProfile', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getUserProfileHandler(id);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateUserStatus = createAsyncThunk('updateUserStatus', async (id: number, { rejectWithValue }) => {
  try {
    const response = await updateUserStatusHandler(id);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});
