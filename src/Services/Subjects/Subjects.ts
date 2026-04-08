import api from '../Api';
import type { CreateSubjectsTypes } from '@/Forms/CreateSubjectsTypes';

// // Get Subjects
// export const getSubjectsData = async () => {
//   return api.get('/v1/subjects');
// };

// //get Subjects by id
// export const getSubjectsDataById = async (subjectsId: string) => {
//   return api.get(`/v1/subjects/${subjectsId}`);
// }

// //Delete Subjects by id
// export const deleteSubjectsDataById = async (subjectsId: string) => {
//   return api.delete(`/v1/subjects/${subjectsId}`);
// }

// //Update Subjects by id
// export const updateSubjectsDataById = async (subjectsId: string, subjectsData: any) => {
//   return api.patch(`/v1/Subjects/${subjectsId}`, subjectsData);
// }

// //create new Subject
// export const createSubject = async (
//   programId: string,
//   subjectsData: CreateSubjectsTypes
// ) => {
//   return api.post(`/v1/subjects/${programId}`, subjectsData);
// };

// GET
export const getSubjects = async () => {
  const res = await api.get('/v1/subjects');
  console.log("API Response for getSubjects: ", res.data.data);
  return res.data.data;
};

// GET BY ID
export const getSubjectsById = async (id: string) => {
  const res = await api.get(`/v1/subjects/${id}`);
  console.log("API Response for getSubjectsById: ", res.data.data.subject);
  return res.data.data.subject;
};

// DELETE
export const deleteSubject = async (id: string) => {
  await api.delete(`/v1/subjects/${id}`);
};

// UPDATE
export const updateSubject = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.patch(`/v1/subjects/${id}`, data);
  return res.data;
};

// CREATE
export const createSubject = async ( data: CreateSubjectsTypes) => {
  const {programId} = data
  const res = await api.post(`/v1/subjects/${programId}`, data);
}
