import api from '../../Api';
import type { CreateYearGroupsTypes } from '@/Forms/CreateYearGroupsTypes';

// // Get YearGroups
// export const getYearGroupsData = async () => {
//   return api.get('/v1/year-groups');
// };

// //get YearGroups by id
// export const getYearGroupsDataById = async (YearGroupsId: string) => {
//   return api.get(`/v1/year-groups/${YearGroupsId}`);
// }

// //Delete YearGroups by id
// export const deleteYearGroupsDataById = async (YearGroupsId: string) => {
//   return api.delete(`/v1/year-groups/${YearGroupsId}`);
// }

// //Update YearGroups by id
// export const updateYearGroupsDataById = async (yearGroupsId: string, yearGroupsData: any) => {
//   return api.patch(`/v1/year-groups/${yearGroupsId}`, yearGroupsData);
// }

// //create new YearGroups
// export const createYearGroup = async (
//   yearGroupsData: CreateYearGroupsTypes
// ) => {
//   return api.post(`/v1/year-groups`, yearGroupsData);
// };

// GET
export const getYearGroups = async () => {
  const res = await api.get('/v1/year-groups');
  console.log("API Response for getYearGroups: ", res.data);
  return res.data.yearGroups;
};

// GET BY ID
export const getYearGroupsById = async (id: string) => {
  const res = await api.get(`/v1/year-groups/${id}`);
  console.log("API Response for getYearGroupsById: ", res.data);
  return res.data.data.yearGroup;
};

// DELETE
export const deleteYearGroup = async (id: string) => {
  await api.delete(`/v1/year-groups/${id}`);
};

// UPDATE
export const updateYearGroup = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await api.patch(`/v1/year-groups/${id}`, data);
  return res.data;
};

// CREATE
export const createYearGroup = async (data: any) => {
  const res = await api.post('/v1/year-groups', data);
  return res.data;
};