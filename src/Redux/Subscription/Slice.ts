import { customToast } from '@/Common/Components/ShowToast';
import type { GetSubscriptions } from '@/pages/Dashboard/Subscriptions/Types';
import { getSubscriptionDataHandler, putSubscriptionDataHandler, removeSubscriptionFeatureHandler } from '@/Services/Subscriptions/Subscriptions';
import { getPaginatedUserManagementDataHandler, getUserManagementDataHandler } from '@/Services/UserManagement/UserManagement';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  statsLoading: boolean;
  subscriptions: GetSubscriptions[];
}

const initialState: State = {
  loading: false,
  statsLoading: false,
  subscriptions: [],
};

// Calls
export const getSubscriptionList = createAsyncThunk('getSubscriptionList', async (_, { rejectWithValue }) => {
  try {
    const response = await getSubscriptionDataHandler();

    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const updateSingleSubscription = createAsyncThunk<any, { id: string; payload: any }>('updateSingleSubscription', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const response = await putSubscriptionDataHandler(id, payload);
    return response;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

export const removeSubscriptionFeature = createAsyncThunk<any, { id: string }>('removeSubscriptionFeature', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await removeSubscriptionFeatureHandler(id);
    return response;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

// Create slice
const SubscriptionSlice = createSlice({
  name: 'subscriptionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionList.pending, (state) => {
        state.loading = true;
        state.statsLoading = true;
      })
      .addCase(getSubscriptionList.fulfilled, (state, action) => {
        state.subscriptions = action.payload;
        state.loading = false;
        state.statsLoading = false;
      })
      .addCase(getSubscriptionList.rejected, (state) => {
        state.loading = false;
        state.statsLoading = false;
      })

      //update single subscription
      .addCase(updateSingleSubscription.pending, (state) => {
        state.loading = true;
        state.statsLoading = true;
      })
      .addCase(updateSingleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.statsLoading = false;
      })
      .addCase(updateSingleSubscription.rejected, (state) => {
        state.loading = false;
        state.statsLoading = false;
      })

      //remove subscription feature
      .addCase(removeSubscriptionFeature.pending, (state) => {
        state.loading = true;
        state.statsLoading = true;
      })
      .addCase(removeSubscriptionFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.statsLoading = false;
      })
      .addCase(removeSubscriptionFeature.rejected, (state) => {
        state.loading = false;
        state.statsLoading = false;
      });
  },
});

export const {} = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;
