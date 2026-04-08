import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../../LearningHub/Slice';
import type { ProgramsDataResponse } from '@/pages/Dashboard/AdminPanel/Programs/Types';
//import { createProgram, deleteProgramsDataById, getProgramsData, getProgramsDataById, updateProgramsDataById } from '@/Services/Programs/Programs';
import type { CreateProgramsTypes } from '@/Forms/CreateProgramTypes';


interface State {
  loading: boolean;
  data: ProgramsDataResponse[];
  pagination: Pagination;
  programs: ProgramsDataResponse[];
}

const initialState: State = {
  loading: false,
  programs: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all Programs
export const getPrograms = createAsyncThunk('getPrograms', async (_, { rejectWithValue }) => {
  try {
    const response = await getProgramsData();
    console.log("Response:", response.data.programs);
    return response.data.programs;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


//get Programs by id
export const getProgramsById = createAsyncThunk('getProgramsById', async (programsId: string, { rejectWithValue }) => {
  try {
    const response = await getProgramsDataById(programsId);
    console.log("Get Programs By Id Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//delete Programs by id
export const deleteProgramsById = createAsyncThunk('deleteProgramsById', async (programsId: string, { rejectWithValue }) => {
  try {
    const response = await deleteProgramsDataById(programsId);
    console.log("Deleted Programs Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//update Programs by id
export const updateProgramsById = createAsyncThunk('updateProgramsById', async ({ programsId, programsData }: { programsId: string, programsData: any }, { rejectWithValue }) => {
  try {
    const response = await updateProgramsDataById(programsId, programsData);
    console.log("Updated Programs Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//create new Program
export const createNewProgram = createAsyncThunk('createNewProgram', async (programData: CreateProgramsTypes, { rejectWithValue }) => {
  try {
    const response = await createProgram(programData);
    console.log("Created Program Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


const Programs = createSlice({
  name: 'Programs',
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
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.programs= action.payload;
      });
  },
});


export const {} = Programs.actions;
export default Programs.reducer;