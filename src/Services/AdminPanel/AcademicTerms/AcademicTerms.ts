import type { CreateAcademicTermTypes } from '@/Forms/CreateAcademicTermTypes';
import api from '../../Api';

// // Get AcademicTerms
// export const getAcademicTermsData = async () => {
//   return api.get('/v1/academic-terms');
// };


// //get AcademicTerm by id
// export const getAcademicTermDataById = async (academicTermId: string) => {
//   return api.get(`/v1/academic-terms/${academicTermId}`);
// }

// //Delete AcademicTerm by id
// export const deleteAcademicTermDataById = async (academicTermId: string) => {
//   return api.delete(`/v1/academic-terms/${academicTermId}`);
// }

// //Update Academic Term by id
// export const updateAcademicTermDataById = async (academicTermId: string, academicTermData: any) => {
//   return api.patch(`/v1/academic-terms/${academicTermId}`, academicTermData);
// }

// //create new Academic Term
// export const createAcademicTerm = async (academicTermData: CreateAcademicTermTypes) => {
//   return api.post('/v1/academic-terms', academicTermData);
// }

// GET
export const getAcademicTerms = async () => {
  const res = await api.get('/v1/academic-terms');
  return res.data.data;
};

// GET BY ID
export const getAcademicTermById = async (id: string) => {
  const res = await api.get(`/v1/academic-terms/${id}`);
  console.log("API Response for getAcademicTermById:", res.data.data.academicTerm);
  return res.data.data.academicTerm;
};

// DELETE
export const deleteAcademicTerm = async (id: string) => {
  await api.delete(`/v1/academic-terms/${id}`);
};

// UPDATE
export const updateAcademicTerm = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.patch(`/v1/academic-terms/${id}`, data);
  return res.data;
};

// CREATE
export const createAcademicTerm = async (data: any) => {
  const res = await api.post('/v1/academic-terms', data);
  return res.data;
};