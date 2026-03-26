import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import type { AcademicTermDataResponse } from '@/pages/Dashboard/AcademicTerms/Types';
import { createAcademicTerm, deleteAcademicTermDataById, getAcademicTermDataById, getAcademicTermsData, updateAcademicTermDataById } from '@/Services/AcademicTerms/AcademicTerms';
import type { CreateAcademicTermTypes } from '@/Forms/CreateAcademicTermTypes';


interface State {
  loading: boolean;
  data: AcademicTermDataResponse[];
  pagination: Pagination;
  academicTerms: AcademicTermDataResponse[];
}

const initialState: State = {
  loading: false,
  academicTerms: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all AcademicTerms
export const getAcademicTerms = createAsyncThunk('getAcademicTerms', async (_, { rejectWithValue }) => {
  try {
    const response = await getAcademicTermsData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


//get AcademicTerm by id
export const getAcademicTermById = createAsyncThunk('getAcademicTermById', async (academicTermId: string, { rejectWithValue }) => {
  try {
    const response = await getAcademicTermDataById(academicTermId);
    console.log("Get Academic Term By Id Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//delete AcademicTerm by id
export const deleteAcademicTermById = createAsyncThunk('deleteAcademicTermById', async (academicTermId: string, { rejectWithValue }) => {
  try {
    const response = await deleteAcademicTermDataById(academicTermId);
    console.log("Delete AcademicTerm Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//update AcademicTerm by id
export const updateAcademicTermById = createAsyncThunk('updateAcademicTermById', async ({ academicTermId, academicTermData }: { academicTermId: string, academicTermData: any }, { rejectWithValue }) => {
  try {
    const response = await updateAcademicTermDataById(academicTermId, academicTermData);
    console.log("Update Academic Term Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//create new AcademicTerm
export const createNewAcademicTerm = createAsyncThunk('createNewAcademicTerm', async (academicTermData: CreateAcademicTermTypes, { rejectWithValue }) => {
  try {
    const response = await createAcademicTerm(academicTermData);
    console.log("Create Academic Term Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


const AcademicTerms = createSlice({
  name: 'AcademicTerms',
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
      .addCase(getAcademicTerms.fulfilled, (state, action) => {
        state.academicTerms = action.payload;
      });
  },
});


export const {} = AcademicTerms.actions;
export default AcademicTerms.reducer;