import type { CreateQuestionTypes } from '@/Forms/CreateQuestionsFormTypes';
import api from '../Api';

// // Get questions
// export const getQuestionsData = async () => {
//   return api.get('/v1/questions');
// };

// export const createQuestion = async (examId: string, questionData: CreateQuestionTypes) => {
//   return api.post(`/v1/questions/${examId}`, questionData);
// };


// //get exam by id
// export const getQuestionDataById = async (questionId: string) => {
//   return api.get(`/v1/questions/${questionId}`);
// }

// //Update Questions by id
// export const updateQuestionsDataById = async (questionsId: string, questionsData: CreateQuestionTypes) => {
//   return api.patch(`/v1/questions/${questionsId}`, questionsData);
// }


// GET ALL
export const getQuestions = async () => {
  const res = await api.get('/v1/questions');
  console.log("res.data: ", res.data);
  return res.data.data;
};

// CREATE
export const createQuestion = async ({
  examId,
  data,
}: {
  examId: string;
  data: CreateQuestionTypes;
}) => {
  const res = await api.post(`/v1/questions/${examId}`, data);
  return res.data;
};

// GET BY ID
export const getQuestionById = async (questionId: string) => {
  const res = await api.get(`/v1/questions/${questionId}`);
  return res.data.question;
};

// UPDATE
export const updateQuestion = async ({
  id,
  data,
}: {
  id: string;
  data: CreateQuestionTypes;
}) => {
  const res = await api.patch(`/v1/questions/${id}`, data);
  return res.data;
};
