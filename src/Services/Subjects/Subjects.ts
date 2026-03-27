import type { CreateProgramsTypes } from '@/Forms/CreateProgramTypes';
import api from '../Api';
import type { CreateSubjectsTypes } from '@/Forms/CreateSubjectsTypes';

// Get Subjects
export const getSubjectsData = async () => {
  return api.get('/v1/subjects');
};

//get Subjects by id
export const getSubjectsDataById = async (subjectsId: string) => {
  return api.get(`/v1/subjects/${subjectsId}`);
}

//Delete Subjects by id
export const deleteSubjectsDataById = async (subjectsId: string) => {
  return api.delete(`/v1/subjects/${subjectsId}`);
}

//Update Subjects by id
export const updateSubjectsDataById = async (subjectsId: string, subjectsData: any) => {
  return api.patch(`/v1/Subjects/${subjectsId}`, subjectsData);
}

//create new Subject
export const createSubject = async (
  programId: string,
  subjectsData: CreateSubjectsTypes
) => {
  return api.post(`/v1/subjects/${programId}`, subjectsData);
};
