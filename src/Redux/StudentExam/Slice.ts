
import type { AdminDataResponse } from '@/pages/Dashboard/AdminPanel/Admins/Types';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
//import { getExamAttemptData, getExamDataById, getSaveAnswerData, getStartExamData, getStudentExamData, getSubmitExamData, studentExamResultData, studentExamResultReviewData } from '@/Services/StudentExam/StudentExam';


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


//get all StudentExams
export const getStudentExam = createAsyncThunk('getStudentExam', async (_, { rejectWithValue }) => {
  try {
    const response = await getStudentExamData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//start exam
export const getStartExam = createAsyncThunk('getStartExam', async (examId: string, { rejectWithValue }) => {
    try {
        const response = await getStartExamData(examId);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//start exam
export const getExamAttempt = createAsyncThunk('getExamAttempt', async (examId: string, { rejectWithValue }) => {
    try {
        const response = await getExamAttemptData(examId);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//patch save answer
export const getSaveAnswer = createAsyncThunk('getSaveAnswer', async ({ examId, questionId, selectedOption }: { examId: any; questionId: string; selectedOption: string }, { rejectWithValue }) => {
    try {
        const response = await getSaveAnswerData(examId, questionId, selectedOption);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//post submit exam
export const getSubmitExam = createAsyncThunk('getSubmitExam', async (examId: string, { rejectWithValue }) => {
    try {
        const response = await getSubmitExamData(examId);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//get StudentExam Result
export const getStudentExamResult = createAsyncThunk('getStudentExamResult', async (examId: string, { rejectWithValue }) => {
    try {
        const response = await studentExamResultData(examId);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//get review Exam result
export const getStudentExamReview = createAsyncThunk('getStudentExamReview', async (examId: string, { rejectWithValue }) => {
    try {
        const response = await studentExamResultReviewData(examId);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//get Exam by id
export const getExamById = createAsyncThunk('getExamById', async (ExamId: string, { rejectWithValue }) => {
  try{
    const response = await getExamDataById(ExamId);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});





const StudentExamsSlice = createSlice({
  name: 'StudentExamsSlice',
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


export const {} = StudentExamsSlice.actions;
export default StudentExamsSlice.reducer;