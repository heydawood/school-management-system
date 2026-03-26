import type { CreateAdminTypes, UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../Api';
import type { CreateTeacherTypes } from '@/Forms/CreateTeacherForm';

// Get Teachers
export const getTeacherData = async () => {
  return api.get('/v1/teachers');
};


//Create New Teacher
export const createTeacher = async (teacherData:CreateTeacherTypes) => {
  return api.post('/v1/teachers/signup-teacher', teacherData);
};


//updateAdmin
export const updateAdminInfo = async (adminData: UpdateAdminType) => {
  return api.patch(`/v1/admins/updateAdmin`, adminData);
};

//get teacher by id
export const getTeacherDataById = async (teacherId: string) => {
  return api.get(`/v1/teachers/${teacherId}`);
}