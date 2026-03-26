import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import type { TeacherDataResponse } from '@/pages/Dashboard/Teachers/Types';
import { createStudent, getStudentData, getStudentDataById } from '@/Services/Students/Students';
import type { CreateStudentTypes } from '@/Forms/CreateStudentForm';
import { createAcademicYear, deleteAcademicYearDataById, getAcademicYearDataById, getAcademicYearsData, updateAcademicYearDataById } from '@/Services/AcademicYears/AcademicYears';
import type { AcademicYearDataResponse } from '@/pages/Dashboard/AcademicYears/Types';
import type { CreateAcademicYearTypes } from '@/Forms/CreateAcademicYearForm';


interface State {
  loading: boolean;
  data: AcademicYearDataResponse[];
  pagination: Pagination;
  academicYears: AcademicYearDataResponse[];
}

const initialState: State = {
  loading: false,
  academicYears: [],
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};


//get all AcademicYears
export const getAcademicYears = createAsyncThunk('getAcademicYears', async (_, { rejectWithValue }) => {
  try {
    const response = await getAcademicYearsData();
    console.log("Response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


//get AcademicYear by id
export const getAcademicYearById = createAsyncThunk('getAcademicYearById', async (academicYearId: string, { rejectWithValue }) => {
  try {
    const response = await getAcademicYearDataById(academicYearId);
    console.log("Get AcademicYear By Id Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//delete AcademicYear by id
export const deleteAcademicYearById = createAsyncThunk('deleteAcademicYearById', async (academicYearId: string, { rejectWithValue }) => {
  try {
    const response = await deleteAcademicYearDataById(academicYearId);
    console.log("Delete AcademicYear Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');

  }
});

//update AcademicYear by id
export const updateAcademicYearById = createAsyncThunk('updateAcademicYearById', async ({ academicYearId, academicYearData }: { academicYearId: string, academicYearData: any }, { rejectWithValue }) => {
  try {
    const response = await updateAcademicYearDataById(academicYearId, academicYearData);
    console.log("Update AcademicYear Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});

//create new AcademicYear
export const createNewAcademicYear = createAsyncThunk('createNewAcademicYear', async (academicYearData: CreateAcademicYearTypes, { rejectWithValue }) => {
  try {
    const response = await createAcademicYear(academicYearData);
    console.log("Create AcademicYear Response:", response.data);
    return response.data;
  } catch (error: any) {
    customToast.error(error?.message ?? 'Something went wrong');
    return rejectWithValue(error?.message ?? 'Something went wrong');
  }
});


const AcademicYears = createSlice({
  name: 'AcademicYears',
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
      .addCase(getAcademicYears.fulfilled, (state, action) => {
        state.academicYears = action.payload;
      });
  },
});


export const {} = AcademicYears.actions;
export default AcademicYears.reducer;