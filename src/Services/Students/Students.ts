import type { UpdateAdminType } from '@/Forms/CreateAdminForm';
import api from '../Api';
import type { CreateStudentTypes } from '@/Forms/CreateStudentForm';

// // Get Students
// export const getStudentData = async () => {
//   return api.get('/v1/students');
// };


// //Create New Student
// export const createStudent = async (studentData:CreateStudentTypes) => {
//   return api.post('/v1/students/signup-student', studentData);
// };


// //updateAdmin
// export const updateAdminInfo = async (adminData: UpdateAdminType) => {
//   return api.patch(`/v1/admins/updateAdmin`, adminData);
// };

// //get student by id
// export const getStudentDataById = async (studentId: string) => {
//   return api.get(`/v1/students/${studentId}`);
// }

// GET
export const getStudents = async () => {
  const res = await api.get('/v1/students');
  console.log("API Response for getStudents: ", res.data.data);
  return res.data.data;
};

// GET BY ID
export const getStudentsById = async (id: string) => {
  const res = await api.get(`/v1/students/${id}`);
  console.log("API Response for getStudentsById: ", res.data.data.student);
  return res.data.data.student;
};



// CREATE
export const createStudent = async (data: any) => {
  const res = await api.post('/v1/students/signup-student', data);
  return res.data;
};


// UPDATE
// export const updateStudent = async ({
//   id,
//   data,
// }: {
//   id: string;
//   data: any;
// }) => {
//   const res = await api.patch(`/v1/students/${id}`, data);
//   return res.data;
// };