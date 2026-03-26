import { customToast } from '@/Common/Components/ShowToast';
import type { Categories } from '@/pages/Dashboard/Categories/Types';
import {
  createAdminWCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryDetailHandler,
  getPaginatedCategoriesHandler,
  updateCategoryHandler,
} from '@/Services/Categories/Category';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  categories: Categories[];
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  categories: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getCategories = createAsyncThunk('getCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await getCategoriesHandler();
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getPaginatedCategories = createAsyncThunk(
  'getPaginatedCategories',
  async (filters: { isPaginated: boolean; page: number; limit: number; search: string }, { rejectWithValue }) => {
    try {
      const response = await getPaginatedCategoriesHandler(filters);
      return response.data.data;
    } catch (error: any) {
      customToast.error(error?.message ?? 'Something went wrong');
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  },
);

export const getSingleCategory = createAsyncThunk('getSingleCategory', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getCategoryDetailHandler(id);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const createAdminCategory = createAsyncThunk('createAdminCategory', async (data: any, { rejectWithValue }) => {
  try {
    const response = await createAdminWCategoryHandler(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateAdminCategory = createAsyncThunk('updateAdminCategory', async (data: { id: number; payload: any }, { rejectWithValue }) => {
  try {
    const response = await updateCategoryHandler(data.id, data.payload);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const deleteAdminCategory = createAsyncThunk('deleteAdminCategory', async (id: number, { rejectWithValue }) => {
  try {
    const response = await deleteCategoryHandler(id);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const CategorySlice = createSlice({
  name: 'workoutsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaginatedCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaginatedCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getPaginatedCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = CategorySlice.actions;
export default CategorySlice.reducer;
