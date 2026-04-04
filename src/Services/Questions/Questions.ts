import type { CreateQuestionTypes } from '@/Forms/CreateQuestionsFormTypes';
import api from '../Api';

// Get questions
export const getQuestionsData = async () => {
  return api.get('/v1/questions');
};

export const createQuestion = async (examId: string, questionData: CreateQuestionTypes) => {
  return api.post(`/v1/questions/${examId}`, questionData);
};


//get exam by id
export const getQuestionDataById = async (questionId: string) => {
  return api.get(`/v1/questions/${questionId}`);
}

//Update Questions by id
export const updateQuestionsDataById = async (questionsId: string, questionsData: CreateQuestionTypes) => {
  return api.patch(`/v1/questions/${questionsId}`, questionsData);
}