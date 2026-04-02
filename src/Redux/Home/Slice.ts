import { customToast } from '@/Common/Components/ShowToast';
import type { Activity, AlertUser, DashboardDataResponse } from '@/pages/Dashboard/Home/Types';
import type { EmergencyAlertModalTabsTypes } from '@/pages/Dashboard/Home/Utils';
import {
  getAdminActivitiesHandler,
  getDashboardDataHandler,
  getEmergencyAlertsHandler,
  getSubscriptionStatsHandler,
  getUserActivitiesHandler,
  getUserGrowthStatsHandler,
  recentFallEventHandler,
  remindAllMembersHandler,
  remindSingleMemberHandler,
  todayHighRiskHandler,
} from '@/Services/Home/Home';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  data: DashboardDataResponse;
  userActivities: Activity[];
  adminActivities: Activity[];
  userAlertsPagination: Pagination;
  userAlerts: AlertUser[];
  userActivitiesPagination: Pagination;
  adminActivitiesPagination: Pagination;
  stats: {
    activeUsers: number;
    allUsers: number;
    last30DysUsers: number;
    totalRevenue: number;
  };
}

const initialState: State = {
  loading: false,
  data: {} as DashboardDataResponse,
  userActivities: [],
  adminActivities: [],
  userAlerts: [],
  userAlertsPagination: { page: 1, limit: 10, totalPages: 0, total: 0 },
  userActivitiesPagination: { page: 1, limit: 10, totalPages: 0, total: 0 },
  adminActivitiesPagination: { page: 1, limit: 10, totalPages: 0, total: 0 },
  stats: {
    activeUsers: 0,
    allUsers: 0,
    last30DysUsers: 0,
    totalRevenue: 0,
  },
};

// Calls
export const getAdminDashboard = createAsyncThunk('getAdminDashboard', async (_, { rejectWithValue }) => {
  try {
    const response = await getDashboardDataHandler();
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message || 'Something went wrong');
    return rejectWithValue(error?.message || 'Something went wrong');
  }
});

export const getUserGrowthStats = createAsyncThunk('getUserGrowthStats', async (userGrowthFilter: any, { rejectWithValue }) => {
  try {
    const response = await getUserGrowthStatsHandler(userGrowthFilter);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message || 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getSubscriptionStats = createAsyncThunk('getSubscriptionStats', async (plan: any, { rejectWithValue }) => {
  try {
    const response = await getSubscriptionStatsHandler(plan);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message || 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getUserActivities = createAsyncThunk('getUserActivities', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await getUserActivitiesHandler(data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message || 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getAdminActivities = createAsyncThunk('getAdminActivities', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await getAdminActivitiesHandler(data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message || 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getEmergencyAlerts = createAsyncThunk('getEmergencyAlerts', async (data: { page: number; limit: number; startDate: any; endDate: any }, { rejectWithValue }) => {
  try {
    const response = await getEmergencyAlertsHandler(data);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message || 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const remindSingleMember = createAsyncThunk('remindSingleMember', async (userId: number, { rejectWithValue }) => {
  try {
    const response = await remindSingleMemberHandler(userId);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const remindAllMembers = createAsyncThunk('remindAllMembers', async (userIds: number[], { rejectWithValue }) => {
  try {
    const response = await remindAllMembersHandler(userIds);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const todayHighRisk = createAsyncThunk('todayHighRisk', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await todayHighRiskHandler(data);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const recentFallEvents = createAsyncThunk('recentFallEvents', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  try {
    const response = await recentFallEventHandler(data);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const homePageSlice = createSlice({
  name: 'homePageSlice',
  initialState,
  reducers: {
    updateReminderStatus: (state, action) => {
      const userIds = action.payload;
      state.userAlerts = state.userAlerts.map((user) => (userIds.includes(user.userId) ? { ...user, isReminded: true } : user));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminDashboard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.userAlerts = action.payload.userAlerts;
      state.stats.activeUsers = action.payload.activeUsers;
      state.stats.allUsers = action.payload.allUsers;
      state.stats.last30DysUsers = action.payload.last30DysUsers;
      state.stats.totalRevenue = action.payload.totalRevenue;
    });
    builder.addCase(getAdminDashboard.rejected, (state) => {
      state.loading = false;
    });
    // User growth stats
    builder.addCase(getUserGrowthStats.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(getUserGrowthStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data.userGrowth = action.payload;
    });
    builder.addCase(getUserGrowthStats.rejected, (state) => {
      state.loading = false;
    });
    // Subscription stats
    builder.addCase(getSubscriptionStats.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(getSubscriptionStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data.subscriptionConversion = action.payload;
    });
    builder.addCase(getSubscriptionStats.rejected, (state) => {
      state.loading = false;
    });
    // User activities
    builder.addCase(getUserActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.userActivities = action.payload.activities;
      state.userActivitiesPagination = action.payload.meta;
    });
    builder.addCase(getUserActivities.rejected, (state) => {
      state.loading = false;
    });
    // Admin activities
    builder.addCase(getAdminActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.adminActivities = action.payload.activities;
      state.adminActivitiesPagination = action.payload.meta;
    });
    builder.addCase(getAdminActivities.rejected, (state) => {
      state.loading = false;
    });
    // Get admin alerts
    builder.addCase(getEmergencyAlerts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmergencyAlerts.fulfilled, (state, action) => {
      state.loading = false;
      state.userAlerts = action.payload.usersAlerts;
      state.userAlertsPagination = action.payload.meta;
    });
    builder.addCase(getEmergencyAlerts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { updateReminderStatus } = homePageSlice.actions;
export default homePageSlice.reducer;
