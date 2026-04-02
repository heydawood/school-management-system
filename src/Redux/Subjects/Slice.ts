import { customToast } from '@/Common/Components/ShowToast';
import type { Pagination } from '@/Utils/Types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaginatedLearningHub } from '../LearningHub/Slice';
import type { SubjectsDataResponse } from '@/pages/Dashboard/Subjects/Types';
import { createSubject, deleteSubjectsDataById, getSubjectsData, getSubjectsDataById, updateSubjectsDataById } from '@/Services/Subjects/Subjects';
import type { CreateSubjectsTypes } from '@/Forms/CreateSubjectsTypes';


interface State {
    loading: boolean;
    data: SubjectsDataResponse[];
    pagination: Pagination;
    subjects: SubjectsDataResponse[];
}

const initialState: State = {
    loading: false,
    subjects: [],
    data: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
};


//get all Subjects
export const getSubjects = createAsyncThunk('getSubjects', async (_, { rejectWithValue }) => {
    try {
        const response = await getSubjectsData();
        console.log("Response:", response.data.data);
        return response.data.data;
    } catch (error: any) {
        //customToast.error(error?.message ?? 'Something went wrong');
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});


//get Subjects by id
export const getSubjectsById = createAsyncThunk('getSubjectsById', async (subjectsId: string, { rejectWithValue }) => {
    try {
        const response = await getSubjectsDataById(subjectsId);
        console.log("Get Subjects By Id Response:", response.data);
        return response.data;
    } catch (error: any) {
        //customToast.error(error?.message ?? 'Something went wrong');
        return rejectWithValue(error?.message ?? 'Something went wrong');

    }
});

//delete Subjects by id
export const deleteSubjectsById = createAsyncThunk('deleteSubjectsById', async (subjectsId: string, { rejectWithValue }) => {
    try {
        const response = await deleteSubjectsDataById(subjectsId);
        console.log("Deleted Subjects Response:", response.data);
        return response.data;
    } catch (error: any) {
        //customToast.error(error?.message ?? 'Something went wrong');
        return rejectWithValue(error?.message ?? 'Something went wrong');

    }
});

//update Subjects by id
export const updateSubjectsById = createAsyncThunk('updateSubjectsById', async ({ subjectsId, subjectsData }: { subjectsId: string, subjectsData: any }, { rejectWithValue }) => {
    try {
        const response = await updateSubjectsDataById(subjectsId, subjectsData);
        console.log("Updated Subjects Response:", response.data);
        return response.data;
    } catch (error: any) {
        //customToast.error(error?.message ?? 'Something went wrong');
        return rejectWithValue(error?.message ?? 'Something went wrong');
    }
});

//create new subject
export const createNewSubject = createAsyncThunk('createNewSubject',
    async (data: CreateSubjectsTypes, { rejectWithValue }) => {

        try {
            //fetching program id for api
            const {programId, ...rest} = data

            const response = await createSubject(programId, rest as any);

            console.log("Created Subjects Response:", response.data);

            return response.data;
        } catch (error: any) {
            //customToast.error(error?.message ?? 'Something went wrong');
            return rejectWithValue(error?.message ?? 'Something went wrong');
        }
    });


const Subjects = createSlice({
    name: 'Subjects',
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
            .addCase(getSubjects.fulfilled, (state, action) => {
                state.subjects = action.payload;
            });
    },
});


export const { } = Subjects.actions;
export default Subjects.reducer;