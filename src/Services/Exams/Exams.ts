import api from '../Api';
import type { CreateExamTypes } from '@/Forms/CreateExamsTypes';

// Get exams
export const getexamsData = async () => {
  return api.get('/v1/exams');
};

// Create exams
export const getCreateExamData = async () => {
  return api.post('/v1/exams');
};

//create new Exam
export const createExam = async (examData: CreateExamTypes) => {
  return api.post('/v1/exams', examData);
}


// //Create New Admin
// export const createAdmin = async (adminData:CreateAdminTypes) => {
//   return api.post('/v1/admins/signup', adminData);
// };


// //updateAdmin
// export const updateAdminInfo = async (adminData: UpdateAdminType) => {
//   return api.patch(`/v1/admins/updateAdmin`, adminData);
// };


//get exam by id
export const getExamDataById = async (examId: string) => {
  return api.get(`/v1/exams/${examId}`);
}