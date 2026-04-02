import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import type { TeacherDataResponse } from '@/pages/Dashboard/Teachers/Types';
import { createStudent, getStudentData, getStudentDataById } from '@/Services/Students/Students';
import type { CreateStudentTypes } from '@/Forms/CreateStudentForm';
import type { StudentDataResponse } from '@/pages/Dashboard/Students/Types';


interface State {
  loading: boolean;
  data: StudentDataResponse[];
  pagination: Pagination;
  students: StudentDataResponse[];
}

const initialState: State = {
  loading: false,
  students: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all students
export const getStudents = createAsyncThunk('getStudents', async (_, { rejectWithValue }) => {
  try {
    const response = await getStudentData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//createNewStudent
export const createNewStudent = createAsyncThunk('createNewStudent', async (studentData: CreateStudentTypes, { rejectWithValue }) => {

  try {
    const response = await createStudent(studentData);
    console.log("Create Student Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//get student by id
export const getStudentById = createAsyncThunk('getStudentById', async (studentId: string, { rejectWithValue }) => {
  try {
    const response = await getStudentDataById(studentId);
    return response.data;
  } catch (error: any) {
    // customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});



const StudentSlice = createSlice({
  name: 'StudentSlice',
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
      }).addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      });
  },
});


export const { } = StudentSlice.actions;
export default StudentSlice.reducer;