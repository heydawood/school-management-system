import type { CreateProgramsTypes } from '@/Forms/CreateProgramTypes';
import api from '../Api';

// Get YearGroups
export const getYearGroupsData = async () => {
  return api.get('/v1/year-groups');
};

//get YearGroups by id
export const getYearGroupsDataById = async (YearGroupsId: string) => {
  return api.get(`/v1/year-groups/${YearGroupsId}`);
}

//Delete YearGroups by id
export const deleteYearGroupsDataById = async (YearGroupsId: string) => {
  return api.delete(`/v1/year-groups/${YearGroupsId}`);
}

//Update YearGroups by id
export const updateYearGroupsDataById = async (yearGroupsId: string, yearGroupsData: any) => {
  return api.patch(`/v1/year-groups/${yearGroupsId}`, yearGroupsData);
}

//create new YearGroups
export const createYearGroup = async (yearGroupData: CreateYearGroupsTypes) => {
  return api.post('/v1/year-groups', yearGroupData);
}