import type { CreateProgramsTypes } from '@/Forms/CreateProgramTypes';
import api from '../Api';

// Get Programs
export const getProgramsData = async () => {
  return api.get('/v1/programs');
};

//get programs by id
export const getProgramsDataById = async (programsId: string) => {
  return api.get(`/v1/programs/${programsId}`);
}

//Delete Programs by id
export const deleteProgramsDataById = async (programsId: string) => {
  return api.delete(`/v1/programs/${programsId}`);
}

//Update Programs by id
export const updateProgramsDataById = async (programsId: string, programsData: any) => {
  return api.patch(`/v1/programs/${programsId}`, programsData);
}

//create new programs
export const createProgram = async (programData: CreateProgramsTypes) => {
  return api.post('/v1/programs', programData);
}