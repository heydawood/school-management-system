import type { CreateAdminTypes, UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../Api';
import type { CreateTeacherTypes } from '@/Forms/CreateTeacherForm';

// Get Teachers
export const getTeacherData = async () => {
  return api.get('/v1/teachers');
};
// Get Teacher Profile
export const getTeacherProfileData = async () => {
  return api.get('/v1/teachers/profile');
};


//Create New Teacher
export const createTeacher = async (teacherData:CreateTeacherTypes) => {
  return api.post('/v1/teachers/signup-teacher', teacherData);
};


//updateTeacher
export const updateTeacherInfo = async (teacherId: string, teacherData: UpdateAdminType) => {
  return api.patch(`/v1/teachers/${teacherId}/update`, teacherData);
};

//get teacher by id
export const getTeacherDataById = async (teacherId: string) => {
  return api.get(`/v1/teachers/${teacherId}`);
}