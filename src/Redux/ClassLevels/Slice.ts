import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import { createAcademicTerm, deleteAcademicTermDataById, getAcademicTermDataById, getAcademicTermsData, updateAcademicTermDataById } from '@/Services/AcademicTerms/AcademicTerms';
import type { CreateAcademicTermTypes } from '@/Forms/CreateAcademicTermTypes';
import type { ClassLevelDataResponse } from '@/pages/Dashboard/ClassLevels/Types';
import { createClassLevel, deleteClassLevelDataById, getClassLevelDataById, getClassLevelsData, updateClassLevelDataById } from '@/Services/ClassLevels/ClassLevels';
import type { CreateClassLevelTypes } from '@/Forms/CreateClassLevelTypes';


interface State {
  loading: boolean;
  data: ClassLevelDataResponse[];
  pagination: Pagination;
  classLevels: ClassLevelDataResponse[];
}

const initialState: State = {
  loading: false,
  classLevels: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all ClassLevels
export const getClassLevels = createAsyncThunk('getClassLevels', async (_, { rejectWithValue }) => {
  try {
    const response = await getClassLevelsData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


//get ClassLevel by id
export const getClassLevelById = createAsyncThunk('getClassLevelById', async (classLevelsId: string, { rejectWithValue }) => {
  try {
    const response = await getClassLevelDataById(classLevelsId);
    console.log("Get Class Level By Id Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//delete AcademicTerm by id
export const deleteClassLevelById = createAsyncThunk('deleteClassLevelById', async (classLevelId: string, { rejectWithValue }) => {
  try {
    const response = await deleteClassLevelDataById(classLevelId);
    console.log("Deleted Class Level Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//update ClassLevel by id
export const updateClassLevelById = createAsyncThunk('updateClassLevelById', async ({ classLevelId, classLevelData }: { classLevelId: string, classLevelData: any }, { rejectWithValue }) => {
  try {
    const response = await updateClassLevelDataById(classLevelId, classLevelData);
    console.log("Updated classLevel Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//create new ClassLevel
export const createNewClassLevel = createAsyncThunk('createNewClassLevel', async (classLevelData: CreateClassLevelTypes, { rejectWithValue }) => {
  try {
    const response = await createClassLevel(classLevelData);
    console.log("Created class Level Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


const ClassLevels = createSlice({
  name: 'ClassLevels',
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
      .addCase(getClassLevels.fulfilled, (state, action) => {
        state.classLevels= action.payload;
      });
  },
});


export const {} = ClassLevels.actions;
export default ClassLevels.reducer;