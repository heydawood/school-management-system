import api from '../Api';
import type { CreateAcademicYearTypes } from '@/Forms/CreateAcademicYearForm';

// Get AcademicYears
export const getAcademicYearsData = async () => {
  return api.get('/v1/academic-years');
};


//get AcademicYear by id
export const getAcademicYearDataById = async (academicYearId: string) => {
  return api.get(`/v1/academic-years/${academicYearId}`);
}

//Delete AcademicYear by id
export const deleteAcademicYearDataById = async (academicYearId: string) => {
  return api.delete(`/v1/academic-years/${academicYearId}`);
}

//Update AcademicYear by id
export const updateAcademicYearDataById = async (academicYearId: string, academicYearData: any) => {
  return api.patch(`/v1/academic-years/${academicYearId}`, academicYearData);
}

//create new AcademicYear
export const createAcademicYear = async (academicYearData: CreateAcademicYearTypes) => {
  return api.post('/v1/academic-years', academicYearData);
}