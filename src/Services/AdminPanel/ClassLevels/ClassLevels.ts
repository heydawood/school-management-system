import api from '../../Api';
import type { CreateClassLevelTypes } from '@/Forms/CreateClassLevelTypes';

// // Get ClassLevels
// export const getClassLevelsData = async () => {
//   return api.get('/v1/class-levels');
// };


// //get ClassLevel by id
// export const getClassLevelDataById = async (classLevelsId: string) => {
//   return api.get(`/v1/class-levels/${classLevelsId}`);
// }

// //Delete AcademicTerm by id
// export const deleteClassLevelDataById = async (classLevelId: string) => {
//   return api.delete(`/v1/class-levels/${classLevelId}`);
// }

// //Update ClassLevel by id
// export const updateClassLevelDataById = async (classLevelId: string, classLevelData: any) => {
//   return api.patch(`/v1/class-levels/${classLevelId}`, classLevelData);
// }

// //create new ClassLevel
// export const createClassLevel = async (classLevelData: CreateClassLevelTypes) => {
//   return api.post('/v1/class-levels', classLevelData);
// }

// GET
export const getClassLevels = async () => {
  const res = await api.get('/v1/class-levels');
  return res.data.data;
};

// GET BY ID
export const getClassLevelsById = async (id: string) => {
  const res = await api.get(`/v1/class-levels/${id}`);
  console.log("API Response for getClassLevelsById: ", res.data);
  return res.data.classLevel;
};

// DELETE
export const deleteClassLevel = async (id: string) => {
  await api.delete(`/v1/class-levels/${id}`);
};

// UPDATE
export const updateClassLevel = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.patch(`/v1/class-levels/${id}`, data);
  return res.data;
};

// CREATE
export const createClassLevel = async (data: any) => {
  const res = await api.post('/v1/class-levels', data);
  return res.data;
};