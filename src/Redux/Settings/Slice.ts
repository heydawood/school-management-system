import { customToast } from '@/Common/Components/ShowToast';
import { updateAdminInfo } from '@/Services/Admin/Admin';
import {
  getAdminBasicSettingsHandler,
  updateAdminPasswordHandler,
  updateAdminBasicSettingsHandler,
  updateTeacherPasswordHandler,
} from '@/Services/Settings/Settings';
import { updateTeacherInfo } from '@/Services/Teacher/Teacher';
// import {
//   getAdminBasicSettingsHandler,
//   updateAdminPasswordHandler,
//   updateAdminBasicSettingsHandler,
//   getAdminSystemSettingsHandler,
//   getSettingsAppUsageHandler,
//   getUserSupportQuestionsHandler,
//   getUserFeedbackSummaryHandler,
// } from '@/Services/Settings/Settings';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Calls
export const getAdminBasicSettings = createAsyncThunk('getAdminSettings', async (_, { rejectWithValue }) => {
  try {
    const response = await getAdminBasicSettingsHandler();
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getAdminSystemSettings = createAsyncThunk('getAdminSystemSettings', async (_, { rejectWithValue }) => {
  try {
    const response = await getAdminSystemSettingsHandler();
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getSettingsAppUsage = createAsyncThunk('getSettingsAppUsage', async (data: { startDate: string | null; endDate: string | null }, { rejectWithValue }) => {
  try {
    const response = await getSettingsAppUsageHandler(data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getUserSupportQuestions = createAsyncThunk('getUserSupportQuestions', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await getUserSupportQuestionsHandler(data.page, data.limit);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getUserFeedbackSummary = createAsyncThunk('getUserFeedbackSummary', async (data: { startDate: string | null; endDate: string | null }, { rejectWithValue }) => {
  try {
    const response = await getUserFeedbackSummaryHandler(data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


//update Admin name and email
export const updateAdminBasicSettings = createAsyncThunk('updateAdminSettings', async (data: any, { rejectWithValue }) => {
  try {
    const response = await updateAdminInfo(data);
    return response.data;
  } catch (error: any) {
    // customToast.error(error?.message??'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateAdminPassword = createAsyncThunk('updateAdminPassword', async (data: any, { rejectWithValue }) => {
  try {
    const response = await updateAdminPasswordHandler(data);
    return response.data;
  } catch (error: any) {
    // customToast.error(error?.message??'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateTeacherPassword = createAsyncThunk('updateTeacherPassword', async (data: any, { rejectWithValue }) => {
  try {
    const response = await updateTeacherPasswordHandler(data);
    return response.data;
  } catch (error: any) {
    // customToast.error(error?.message??'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//update Teacher name and email
export const updateTeacherBasicSettings = createAsyncThunk(
  'updateTeacherBasicSettings',
  async ({ teacherId, data }: { teacherId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await updateTeacherInfo(teacherId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  }
);
