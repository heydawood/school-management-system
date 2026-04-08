import api from '../../Api';
import type { CreateAcademicYearTypes } from '@/Forms/CreateAcademicYearForm';

// // Get AcademicYears
// export const getAcademicYearsData = async () => {
//   return api.get('/v1/academic-years');
// };


// //get AcademicYear by id
// export const getAcademicYearDataById = async (academicYearId: string) => {
//   return api.get(`/v1/academic-years/${academicYearId}`);
// }

// //Delete AcademicYear by id
// export const deleteAcademicYearDataById = async (academicYearId: string) => {
//   return api.delete(`/v1/academic-years/${academicYearId}`);
// }

// //Update AcademicYear by id
// export const updateAcademicYearDataById = async (academicYearId: string, academicYearData: any) => {
//   return api.patch(`/v1/academic-years/${academicYearId}`, academicYearData);
// }

// //create new AcademicYear
// export const createAcademicYear = async (academicYearData: CreateAcademicYearTypes) => {
//   return api.post('/v1/academic-years', academicYearData);
// }

// GET
export const getAcademicYears = async () => {
  const res = await api.get('/v1/academic-years');
  return res.data.data;
};

// GET BY ID
export const getAcademicYearById = async (id: string) => {
  const res = await api.get(`/v1/academic-years/${id}`);
  //console.log("API Response for getAcademicYearById:", res.data)
  return res.data.data.academicYear;
};

// DELETE
export const deleteAcademicYear = async (id: string) => {
  await api.delete(`/v1/academic-years/${id}`);
};

// UPDATE
export const updateAcademicYear = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.patch(`/v1/academic-years/${id}`, data);
  return res.data;
};

// CREATE
export const createAcademicYear = async (data: any) => {
  const res = await api.post('/v1/academic-years', data);
  return res.data;
};