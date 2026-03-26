import { customToast } from '@/Common/Components/ShowToast';
import type { Workout, WorkoutCategory } from '@/pages/Dashboard/Workouts/Types';
import {
  createAdminWorkoutCategoryHandler,
  createAdminWorkoutHandler,
  createWorkoutExerciseHandler,
  deleteAdminWorkoutHandler,
  deleteWorkoutExerciseHandler,
  getWorkoutCategoriesHandler,
  getWorkoutDetailHandler,
  getWorkoutListHandler,
  updateAdminWorkoutHandler,
  updateAdminWorkoutStatusHandler,
  updateWorkoutExerciseHandler,
} from '@/Services/Workouts/Workout';
import type { WorkoutLevels } from '@/Utils/Constants';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  workouts: Workout[];
  categories: WorkoutCategory[];
  stats: {
    totalWorkouts: number;
    beginnerWorkouts: number;
    intermediateWorkouts: number;
    professionalWorkouts: number;
  };
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  workouts: [],
  categories: [],
  stats: {
    totalWorkouts: 0,
    beginnerWorkouts: 0,
    intermediateWorkouts: 0,
    professionalWorkouts: 0,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getWorkoutCategories = createAsyncThunk('getWorkoutCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await getWorkoutCategoriesHandler();
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const createAdminWorkoutCategory = createAsyncThunk('createAdminWorkoutCategory', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createAdminWorkoutCategoryHandler(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const createAdminWorkout = createAsyncThunk('createAdminWorkout', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createAdminWorkoutHandler(data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateAdminWorkout = createAsyncThunk('updateAdminWorkout', async (data: { id: number; payload: any }, { rejectWithValue }) => {
  try {
    const response = await updateAdminWorkoutHandler(data.id, data.payload);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateAdminWorkoutStatus = createAsyncThunk('updateAdminWorkoutStatus', async (data: { id: number; status: 'Published' | 'Draft' }, { rejectWithValue }) => {
  try {
    const response = await updateAdminWorkoutStatusHandler(data.id, { status: data.status });
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const deleteAdminWorkout = createAsyncThunk('deleteAdminWorkout', async (id: number, { rejectWithValue }) => {
  try {
    const response = await deleteAdminWorkoutHandler(id);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getWorkoutList = createAsyncThunk(
  'getWorkoutList',
  async (filters: { page: number; limit: number; category: number | null; level: WorkoutLevels | null; search: string }, { rejectWithValue }) => {
    try {
      const response = await getWorkoutListHandler(filters);
      return response.data.data;
    } catch (error: any) {
      customToast.error(error?.message ?? 'Something went wrong');
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  },
);

export const getWorkoutDetail = createAsyncThunk('getWorkoutDetail', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getWorkoutDetailHandler(id);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const createWorkoutExercise = createAsyncThunk('createWorkoutExercise', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createWorkoutExerciseHandler(data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateWorkoutExercise = createAsyncThunk('updateWorkoutExercise', async (data: { id: number; payload: any }, { rejectWithValue }) => {
  try {
    const response = await updateWorkoutExerciseHandler(data.id, data.payload);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const deleteWorkoutExercise = createAsyncThunk('deleteWorkoutExercise', async (id: number, { rejectWithValue }) => {
  try {
    const response = await deleteWorkoutExerciseHandler(id);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const workoutsSlice = createSlice({
  name: 'workoutsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkoutList.fulfilled, (state, action) => {
        state.workouts = action.payload.workouts;
        state.categories = action.payload.categories;
        state.stats.totalWorkouts = action.payload.totalWorkouts;
        state.stats.beginnerWorkouts = action.payload.beginnerWorkouts;
        state.stats.intermediateWorkouts = action.payload.intermediateWorkouts;
        state.stats.professionalWorkouts = action.payload.professionalWorkouts;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getWorkoutList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = workoutsSlice.actions;
export default workoutsSlice.reducer;
