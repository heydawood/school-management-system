import { customToast } from '@/Common/Components/ShowToast';
import type { GetPaymentTypes } from '@/pages/Dashboard/Payments/Types';
import { exportPaymentsHandler, getPaginatedPaymentsDataHandler, getPaymentDetailHandler, getPaymentPlansDataHandler, getPaymentsDataHandler } from '@/Services/Payments/Payments';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  statsLoading: boolean;
  payments: GetPaymentTypes[];
  plans: any;
  stats: {
    userCount: number;
    activeSubscriptions: number;
    revenue: number;
  };
  pagination: Pagination;
}

const initialState: State = {
  loading: false,
  statsLoading: false,
  payments: [],
  plans: [],
  stats: {
    userCount: 0,
    activeSubscriptions: 0,
    revenue: 0,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

// Calls
export const getPaymentsList = createAsyncThunk(
  'getPaymentsList',
  async (data: { page: number; limit: number; plan?: number | null; search?: string | null; startDate?: Date | null; endDate?: Date | null }, { rejectWithValue }) => {
    const { page, limit, plan = null, search = null, startDate = null, endDate = null } = data;
    try {
      const response = await getPaymentsDataHandler(page, limit, plan, search, startDate, endDate);

      return response.data.data;
    } catch (error: any) {
      //customToast.error(error?.message ?? 'Something went wrong');
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  },
);

export const exportPayments = createAsyncThunk(
  'exportPayments',
  async (data: { page: number; limit: number; plan?: number | null; search?: string | null; startDate?: Date | null; endDate?: Date | null }, { rejectWithValue }) => {
    const { page, limit, plan = null, search = null, startDate = null, endDate = null } = data;
    try {
      const response = await exportPaymentsHandler(page, limit, plan, search, startDate, endDate);
      return response.data;
    } catch (error: any) {
      //customToast.error(error?.message ?? 'Something went wrong');
      return rejectWithValue(error?.message ?? 'Something went wrong');
    }
  },
);

export const getPaymentsPaginatedList = createAsyncThunk('getPaymentsPaginatedList', async (data: { page: number; limit: number }, { rejectWithValue }) => {
  const { page, limit } = data;
  try {
    const response = await getPaginatedPaymentsDataHandler(page, limit);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getPaymentDetail = createAsyncThunk('getPaymentDetail', async (id: number, { rejectWithValue }) => {
  try {
    const response = await getPaymentDetailHandler(id);
    return response.data.data;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const getPlansList = createAsyncThunk('getPlansList', async (_, { rejectWithValue }) => {
  try {
    const response = await getPaymentPlansDataHandler();

    const plans =
      response.data?.data?.map((plan: any) => ({
        planId: plan.planId,
        planName: plan.planName,
      })) || [];

    return plans;
  } catch (error: any) {
    //customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const paymentsSlice = createSlice({
  name: 'paymentsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentsList.pending, (state) => {
        state.loading = true;
        state.statsLoading = true;
      })
      .addCase(getPaymentsList.fulfilled, (state, action) => {
        state.payments = action.payload.payments;
        state.stats.userCount = action.payload.userCount;
        state.stats.activeSubscriptions = action.payload.activeSubscriptions;
        state.stats.revenue = action.payload.revenue;
        state.pagination = action.payload.meta;
        state.loading = false;
        state.statsLoading = false;
      })
      .addCase(getPaymentsList.rejected, (state) => {
        state.loading = false;
        state.statsLoading = false;
      })
      //   Pagination
      .addCase(getPaymentsPaginatedList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentsPaginatedList.fulfilled, (state, action) => {
        state.payments = action.payload.payments;
        state.pagination = action.payload.meta;
        state.loading = false;
      })
      .addCase(getPaymentsPaginatedList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = paymentsSlice.actions;
export default paymentsSlice.reducer;
