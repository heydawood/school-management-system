import type { UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../Api';
import type { CreateTeacherTypes } from '@/Forms/CreateTeacherForm';

// // Get Teachers
// export const getTeacherData = async () => {
//   return api.get('/v1/teachers');
// };
// // Get Teacher Profile
// export const getTeacherProfileData = async () => {
//   return api.get('/v1/teachers/profile');
// };


// //Create New Teacher
// export const createTeacher = async (teacherData:CreateTeacherTypes) => {
//   return api.post('/v1/teachers/signup-teacher', teacherData);
// };


// //updateTeacher
// export const updateTeacherInfo = async (teacherId: string, teacherData: UpdateAdminType) => {
//   return api.patch(`/v1/teachers/${teacherId}/update`, teacherData);
// };

// //get teacher by id
// export const getTeacherDataById = async (teacherId: string) => {
//   return api.get(`/v1/teachers/${teacherId}`);
// }


// GET ALL TEACHERS
export const getTeachers = async () => {
  const res = await api.get('/v1/teachers');
  return res.data.data; 
};



// GET TEACHER PROFILE
export const getTeacherProfile = async () => {
  const res = await api.get('/v1/teachers/profile');
  console.log('Teacher Profile Response:', res.data);
  return res.data.teacher; // normalize response
};


// CREATE TEACHER
export const createTeacher = async (teacherData: CreateTeacherTypes) => {
  const res = await api.post('/v1/teachers/signup-teacher', teacherData);
  return res.data;
};



// UPDATE TEACHER
export const updateTeacher = async (
  teacherId: string,
  teacherData: UpdateAdminType
) => {
  const res = await api.patch(`/v1/teachers/${teacherId}/update`, teacherData);
  return res.data;
};


// GET TEACHER BY ID
export const getTeacherById = async (teacherId: string) => {
  const res = await api.get(`/v1/teachers/${teacherId}`);
  console.log('Teacher Data by ID Response:', res.data);

  return res.data.data.teacher;
};