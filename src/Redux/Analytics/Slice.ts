import { customToast } from '@/Common/Components/ShowToast';
import { getBehavioralAnalyticsHandler, getFeatureEngagementsHandler } from '@/Services/Analytics/Analytics';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Calls
export const getBehavioralAnalytics = createAsyncThunk('getBehavioralAnalytics', async (_, { rejectWithValue }) => {
  try {
    const response = await getBehavioralAnalyticsHandler();
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getFeatureEngagements = createAsyncThunk('getFeatureEngagements', async (type: string, { rejectWithValue }) => {
  try {
    const response = await getFeatureEngagementsHandler(type);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const analyticsSlice = createSlice({
  name: 'analyticsSlice',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = analyticsSlice.actions;
export default analyticsSlice.reducer;
