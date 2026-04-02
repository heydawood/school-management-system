import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import { createTeacher, getTeacherData, getTeacherDataById, getTeacherProfileData } from '@/Services/Teacher/Teacher';
import type { TeacherDataResponse } from '@/pages/Dashboard/Teachers/Types';
import type { CreateTeacherTypes } from '@/Forms/CreateTeacherForm';


interface State {
  loading: boolean;
  data: TeacherDataResponse[];
  pagination: Pagination;
  teachers: TeacherDataResponse[];
}

const initialState: State = {
  loading: false,
  teachers: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all teachers
export const getTeachers = createAsyncThunk('getTeachers', async (_, { rejectWithValue }) => {
  try {
    const response = await getTeacherData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//get teacher profile
export const getTeacherProfile = createAsyncThunk('getTeacherProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await getTeacherProfileData();
    console.log("Response:", response.data.teacher);
    return response.data.teacher;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//createNewTeacher
export const createNewTeacher = createAsyncThunk('createNewTeacher', async (teacherData: CreateTeacherTypes, { rejectWithValue }) => {

  try {
    const response = await createTeacher(teacherData);
    console.log("Create Teacher Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//get teacher by id
export const getTeacherById = createAsyncThunk('getTeacherById', async (teacherId: string, { rejectWithValue }) => {
  try {
    const response = await getTeacherDataById(teacherId);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});



const TeacherSlice = createSlice({
  name: 'TeacherSlice',
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
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      });
  },
});


export const { } = TeacherSlice.actions;
export default TeacherSlice.reducer;