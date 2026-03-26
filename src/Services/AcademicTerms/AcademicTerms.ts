import type { CreateAcademicTermTypes } from '@/Forms/CreateAcademicTermTypes';
import api from '../Api';

// Get AcademicTerms
export const getAcademicTermsData = async () => {
  return api.get('/v1/academic-terms');
};


//get AcademicTerm by id
export const getAcademicTermDataById = async (academicTermId: string) => {
  return api.get(`/v1/academic-terms/${academicTermId}`);
}

//Delete AcademicTerm by id
export const deleteAcademicTermDataById = async (academicTermId: string) => {
  return api.delete(`/v1/academic-terms/${academicTermId}`);
}

//Update Academic Term by id
export const updateAcademicTermDataById = async (academicTermId: string, academicTermData: any) => {
  return api.patch(`/v1/academic-terms/${academicTermId}`, academicTermData);
}

//create new AcademicYear
export const createAcademicTerm = async (academicTermData: CreateAcademicTermTypes) => {
  return api.post('/v1/academic-terms', academicTermData);
}