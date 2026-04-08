import type { CreateProgramsTypes } from '@/Forms/CreateProgramTypes';
import api from '../../Api';

// // Get Programs
// export const getProgramsData = async () => {
//   return api.get('/v1/programs');
// };

// //get programs by id
// export const getProgramsDataById = async (programsId: string) => {
//   return api.get(`/v1/programs/${programsId}`);
// }

// //Delete Programs by id
// export const deleteProgramsDataById = async (programsId: string) => {
//   return api.delete(`/v1/programs/${programsId}`);
// }

// //Update Programs by id
// export const updateProgramsDataById = async (programsId: string, programsData: any) => {
//   return api.patch(`/v1/programs/${programsId}`, programsData);
// }

// //create new programs
// export const createProgram = async (programData: CreateProgramsTypes) => {
//   return api.post('/v1/programs', programData);
// }

// GET
export const getPrograms = async () => {
  const res = await api.get('/v1/programs');
  console.log("API Response for getPrograms: ", res.data);
  return res.data.programs;
};

// GET BY ID
export const getProgramsById = async (id: string) => {
  const res = await api.get(`/v1/programs/${id}`);
  console.log("API Response for getProgramsById: ", res.data.data.program);
  return res.data.data.program;
};

// DELETE
export const deleteProgram = async (id: string) => {
  await api.delete(`/v1/programs/${id}`);
};

// UPDATE
export const updateProgram = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.patch(`/v1/programs/${id}`, data);
  return res.data;
};

// CREATE
export const createProgram = async (data: any) => {
  const res = await api.post('/v1/programs', data);
  return res.data;
};