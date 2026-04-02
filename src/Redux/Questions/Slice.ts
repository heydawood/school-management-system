import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import type { QuestionsDataResponse } from '@/pages/Dashboard/TeacherPanel/Questions/Types';
import { createQuestion, getQuestionDataById, getQuestionsData, updateQuestionsDataById } from '@/Services/Questions/Questions';


interface State {
  loading: boolean;
  data: QuestionsDataResponse[];
  pagination: Pagination;
  questions: QuestionsDataResponse[];
}

const initialState: State = {
  loading: false,
  questions: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all Questions
export const getQuestions = createAsyncThunk('getQuestions', async (_, { rejectWithValue }) => {
  try {
    const response = await getQuestionsData();
    console.log("Questions Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//create new Question
export const createNewQuestion = createAsyncThunk(
  'createNewQuestion',
  async ({ examId, data }: { examId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await createQuestion(examId, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  }
);



//get question by id
export const getQuestionById = createAsyncThunk('getQuestionById', async (questionId: string, { rejectWithValue }) => {
  try{
    const response = await getQuestionDataById(questionId);
    console.log('slice: ', response.data.question)
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//update Questions by id
export const updateQuestionsById = createAsyncThunk('updateQuestionsById', async ({ questionsId, questionsData }: { questionsId: string, questionsData: any }, { rejectWithValue }) => {
  try {
    const response = await updateQuestionsDataById(questionsId, questionsData);
    console.log("Update Questions Response:", response.data);
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});




const QuestionsSlice = createSlice({
  name: 'QuestionsSlice',
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
      .addCase(getQuestions.fulfilled, (state, action) => {
                      state.questions = action.payload;
                  });
  },
});


export const {} = QuestionsSlice.actions;
export default QuestionsSlice.reducer;