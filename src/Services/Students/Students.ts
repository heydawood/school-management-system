import type { UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../Api';
import type { CreateStudentTypes } from '@/Forms/CreateStudentForm';

// Get Students
export const getStudentData = async () => {
  return api.get('/v1/students');
};


//Create New Student
export const createStudent = async (studentData:CreateStudentTypes) => {
  return api.post('/v1/students/signup-student', studentData);
};


//updateAdmin
export const updateAdminInfo = async (adminData: UpdateAdminType) => {
  return api.patch(`/v1/admins/updateAdmin`, adminData);
};

//get student by id
export const getStudentDataById = async (studentId: string) => {
  return api.get(`/v1/students/${studentId}`);
}