import type { CreateAcademicTermTypes } from '@/Forms/CreateAcademicTermTypes';
import api from '../Api';
import type { CreateClassLevelTypes } from '@/Forms/CreateClassLevelTypes';

// Get ClassLevels
export const getClassLevelsData = async () => {
  return api.get('/v1/class-levels');
};


//get ClassLevel by id
export const getClassLevelDataById = async (classLevelsId: string) => {
  return api.get(`/v1/class-levels/${classLevelsId}`);
}

//Delete AcademicTerm by id
export const deleteClassLevelDataById = async (classLevelId: string) => {
  return api.delete(`/v1/class-levels/${classLevelId}`);
}

//Update ClassLevel by id
export const updateClassLevelDataById = async (classLevelId: string, classLevelData: any) => {
  return api.patch(`/v1/class-levels/${classLevelId}`, classLevelData);
}

//create new ClassLevel
export const createClassLevel = async (classLevelData: CreateClassLevelTypes) => {
  return api.post('/v1/class-levels', classLevelData);
}