import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../../LearningHub/Slice';
import type { CreateProgramsTypes } from '@/Forms/CreateProgramTypes';
//import { createYearGroup, deleteYearGroupsDataById, getYearGroupsData, getYearGroupsDataById, updateYearGroupsDataById } from '@/Services/YearGroups/YearGroups';
import type { YearGroupsDataResponse } from '@/pages/Dashboard/AdminPanel/YearGroups/Types';
import type { CreateYearGroupsTypes } from '@/Forms/CreateYearGroupsTypes';


interface State {
  loading: boolean;
  data: YearGroupsDataResponse[];
  pagination: Pagination;
  yearGroups: YearGroupsDataResponse[];
}

const initialState: State = {
  loading: false,
  yearGroups: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all YearGroups
export const getYearGroups = createAsyncThunk('getYearGroups', async (_, { rejectWithValue }) => {
  try {
    const response = await getYearGroupsData();
    console.log("Response YearGroups :", response.data.yearGroups);
    return response.data.yearGroups;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


//get YearGroups by id
export const getYearGroupsById = createAsyncThunk('getYearGroupsById', async (yearGroupsId: string, { rejectWithValue }) => {
  try {
    const response = await getYearGroupsDataById(yearGroupsId);
    console.log("Get Programs By Id Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//delete Programs by id
export const deleteYearGroupsById = createAsyncThunk('deleteYearGroupsById', async (yearGroupsId: string, { rejectWithValue }) => {
  try {
    const response = await deleteYearGroupsDataById(yearGroupsId);
    console.log("Deleted YearGroups Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//update Programs by id
export const updateYearGroupsById = createAsyncThunk('updateYearGroupsById', async ({ yearGroupsId, yearGroupsData }: { yearGroupsId: string, yearGroupsData: any }, { rejectWithValue }) => {
  try {
    const response = await updateYearGroupsDataById(yearGroupsId, yearGroupsData);
    console.log("Updated YearGroups Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//create new Year Group
export const createNewYearGroup = createAsyncThunk(
  'createNewYearGroup',
  async (data: CreateYearGroupsTypes, { rejectWithValue }) => {
    try {
      const response = await createYearGroup(data); // send FULL data

      console.log("Created year Response:", response.data);

      return response.data;

        } catch (error: any) {
            //customToast.error(error?.message ?? 'Something went wrong');
            return rejectWithValue(error?.message ?? 'Something went wrong');
        }
    });


const YearGroups = createSlice({
  name: 'YearGroups',
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
      })
      .addCase(getYearGroups.fulfilled, (state, action) => {
        state.yearGroups= action.payload;
      });
  },
});


export const {} = YearGroups.actions;
export default YearGroups.reducer;