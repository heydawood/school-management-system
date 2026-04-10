import { customToast } from '@/Common/Components/ShowToast';
import { commonFileUploadHandler } from '@/Services/Common/Common';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Calls
export const commonFileUpload = createAsyncThunk('commonFileUpload', async (data: any, { rejectWithValue }) => {
  try {
    const response = await updateAdminInfo(data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});
