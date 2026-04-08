import api from '../Api';
import type { CreateExamTypes } from '@/Forms/CreateExamsTypes';

// //Get exams
// export const getexamsData = async () => {
//   return api.get('/v1/exams');
// };

// // Create exams
// export const getCreateExamData = async () => {
//   return api.post('/v1/exams');
// };

// //create new Exam
// export const createExam = async (examData: CreateExamTypes) => {
//   return api.post('/v1/exams', examData);
// }


// //get exam by id
// export const getExamDataById = async (examId: string) => {
//   return api.get(`/v1/exams/${examId}`);
// }

// GET ALL
export const getExams = async () => {
  const res = await api.get('/v1/exams');
  return res.data.data;
};

// CREATE
export const createExam = async (examData: CreateExamTypes) => {
  const res = await api.post('/v1/exams', examData);
  return res.data;
};

// GET BY ID
export const getExamById = async (examId: string) => {
  const res = await api.get(`/v1/exams/${examId}`);
  console.log("Exam by ID Response:", res.data.exam);
  return res.data.exam;
};