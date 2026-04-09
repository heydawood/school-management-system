
import type { AdminDataResponse } from '@/pages/Dashboard/AdminPanel/Admins/Types';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import { getResultsData } from '@/Services/Results/Results';


interface State {
  loading: boolean;
  data: AdminDataResponse[];
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all Results
export const getResults = createAsyncThunk('getResults', async (_, { rejectWithValue }) => {
  try {
    const response = await getResultsData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});




const ResultsSlice = createSlice({
  name: 'ResultsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedLearningHub.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaginatedLearningHub.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getPaginatedLearningHub.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const {} = ResultsSlice.actions;
export default ResultsSlice.reducer;