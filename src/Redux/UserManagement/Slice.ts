import { customToast } from '@/Common/Components/ShowToast';
import type { UserManagementUser } from '@/pages/Dashboard/UsersManagement/Types';
import { adminLoginHandler } from '@/Services/Auth/Auth';
import { exportUsersHandler, getFiltersMetahandler, getPaginatedUserManagementDataHandler, getUserManagementDataHandler } from '@/Services/UserManagement/UserManagement';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  statsLoading: boolean;
  users: UserManagementUser[];
  stats: {
    freeUsersCount: number;
    trialUsersCount: number;
    waitingUsersCount: number;
    paidUsersCount: number;
    careGiverCount: number;
  };
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  statsLoading: false,
  users: [],
  stats: {
    freeUsersCount: 0,
    trialUsersCount: 0,
    waitingUsersCount: 0,
    paidUsersCount: 0,
    careGiverCount: 0,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getUserManagementList = createAsyncThunk('getUserManagementList', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  const { page, limit } = data;
  try {
    const response = await getUserManagementDataHandler(page, limit);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getUserManagementPaginatedList = createAsyncThunk('getUserManagementPaginatedList', async (data: any, { rejectWithValue }) => {
  try {
    const response = await getPaginatedUserManagementDataHandler(data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getFiltersMeta = createAsyncThunk('getFiltersMeta', async (_, { rejectWithValue }) => {
  try {
    const response = await getFiltersMetahandler();
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const exportUsers = createAsyncThunk('exportUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await exportUsersHandler();
    return response.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const userManagementSlice = createSlice({
  name: 'userManagementSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserManagementList.pending, (state) => {
        state.loading = true;
        state.statsLoading = true;
      })
      .addCase(getUserManagementList.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.stats.careGiverCount = action.payload.careGiverCount;
        state.stats.freeUsersCount = action.payload.freeUsersCount;
        state.stats.trialUsersCount = action.payload.trialUsersCount;
        state.stats.waitingUsersCount = action.payload.waitingUsersCount;
        state.stats.paidUsersCount = action.payload.paidUsersCount;
        state.pagination = action.payload.meta;
        state.loading = false;
        state.statsLoading = false;
      })
      .addCase(getUserManagementList.rejected, (state) => {
        state.loading = false;
        state.statsLoading = false;
      })
      //   Pagination
      .addCase(getUserManagementPaginatedList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserManagementPaginatedList.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getUserManagementPaginatedList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = userManagementSlice.actions;
export default userManagementSlice.reducer;
