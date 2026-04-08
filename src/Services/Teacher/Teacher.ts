import type { UpdateAdminType } from '@/Forms/CreateAdminForm';
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

// // GET
// export const getTeachers = async () => {
//   const res = await api.get('/v1/teachers');
//   console.log("API Response for getTeachers: ", res.data.data);
//   return res.data.data;
// };

// //GET TEACHER PROFILE
// export const getTeachersProfile = async () => {
//   const res = await api.get('/v1/teachers/profile');
//   console.log("API Response for getTeacherProfile: ", res.data);
//   return res.data.data;
// };


// // GET BY ID
// export const getTeachersById = async (id: string) => {
//   const res = await api.get(`/v1/teachers/${id}`);
//   console.log("API Response for getTeachersById: ", res.data);
//   return res.data.data.teacher;
// };

// // UPDATE
// export const updateTeachers = async (id: string, data: UpdateAdminType) => {
//   const res = await api.patch(`/v1/teachers/${id}/update`, data);
//   return res.data;
// };

// // CREATE
// export const createTeachers = async ( teacherData: CreateTeacherTypes) => {
//   const res = await api.post('/v1/teachers/signup-teacher', teacherData);
//   return res.data;
// }