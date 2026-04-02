import { customToast } from '@/Common/Components/ShowToast';
import type { LearningHubResponse } from '@/pages/Dashboard/LearningHub/Types';
import {
  createAdminLearningHubHandler,
  deleteLearningHubHandler,
  getLearningHubDetailHandler,
  getLearningHubHandler,
  updateLearningHubHandler,
} from '@/Services/LearningHub/LearningHub';

import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  dietPlans: LearningHubResponse[];
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  dietPlans: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

export const getPaginatedLearningHub = createAsyncThunk('getPaginatedLearningHub', async (filters: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await getLearningHubHandler(filters);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getSingleLearningHub = createAsyncThunk('getSingleLearningHub', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getLearningHubDetailHandler(id);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const createAdminLearningHub = createAsyncThunk('createAdminLearningHub', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createAdminLearningHubHandler(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateAdminLearningHub = createAsyncThunk('updateAdminLearningHub', async (data: { id: number; payload: any }, { rejectWithValue }) => {
  try {
    const response = await updateLearningHubHandler(data.id, data.payload);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const deleteAdminLearningHub = createAsyncThunk('deleteAdminLearningHub', async (id: number, { rejectWithValue }) => {
  try {
    const response = await deleteLearningHubHandler(id);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const LearningHubSlice = createSlice({
  name: 'LearningHubSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedLearningHub.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaginatedLearningHub.fulfilled, (state, action) => {
        state.dietPlans = action.payload.dietPlans;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getPaginatedLearningHub.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = LearningHubSlice.actions;
export default LearningHubSlice.reducer;
