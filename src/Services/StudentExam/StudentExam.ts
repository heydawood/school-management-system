import api from '../Api';
import type { CreateExamTypes } from '@/Forms/CreateExamsTypes';

// Get StudentExam
export const getStudentExamData = async () => {
  return api.get('/v1/student/exams');
};

// Create exams
export const getCreateExamData = async () => {
  return api.post('/v1/exams');
};

//create new Exam
export const createExam = async (examData: CreateExamTypes) => {
  return api.post('/v1/exams', examData);
}


//get exam by id
export const getExamDataById = async (examId: string) => {
  return api.get(`/v1/exams/${examId}`);
}

// post getStartExamData
export const getStartExamData = async (examId: string) => {
  return api.post(`/v1/student/exams/${examId}/start`);
}

// get getExamAttemptData
export const getExamAttemptData = async (examId: string) => {
  return api.get(`/v1/student/exams/${examId}/attempt`);
}

//patch save answer
export const getSaveAnswerData = async (examId: string, questionId: string, selectedOption: string) => {
    return api.patch(`/v1/student/exams/${examId}/answer`, { selectedOption, questionId });
}

//post submit exam
export const getSubmitExamData = async (examId: string) => {
    return api.post(`/v1/student/exams/${examId}/submit`);
}

//get StudentExam Result
export const studentExamResultData = async (examId: string) => {
  return api.get(`/v1/student/exams/${examId}/result`);
}

//get StudentExam Review
export const studentExamResultReviewData = async (examId: string) => {
  return api.get(`/v1/student/exams/${examId}/review`);
}