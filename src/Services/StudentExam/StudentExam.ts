import api from '../Api';

// // Get StudentExam
// export const getStudentExamData = async () => {
//   return api.get('/v1/student/exams');
// };

// //get exam by id
// export const getExamDataById = async (examId: string) => {
//   return api.get(`/v1/exams/${examId}`);
// }

// // post getStartExamData
// export const getStartExamData = async (examId: string) => {
//   return api.post(`/v1/student/exams/${examId}/start`);
// }

// // get getExamAttemptData
// export const getExamAttemptData = async (examId: string) => {
//   return api.get(`/v1/student/exams/${examId}/attempt`);
// }

// //patch save answer
// export const getSaveAnswerData = async (examId: string, questionId: string, selectedOption: string) => {
//     return api.patch(`/v1/student/exams/${examId}/answer`, { selectedOption, questionId });
// }

// //post submit exam
// export const getSubmitExamData = async (examId: string) => {
//     return api.post(`/v1/student/exams/${examId}/submit`);
// }

// //get StudentExam Result
// export const studentExamResultData = async (examId: string) => {
//   return api.get(`/v1/student/exams/${examId}/result`);
// }

// //get StudentExam Review
// export const studentExamResultReviewData = async (examId: string) => {
//   return api.get(`/v1/student/exams/${examId}/review`);
// }


// GET ALL STUDENT EXAMS

export const getStudentExams = async () => {
  const res = await api.get('/v1/student/exams');
  console.log('Student Exams Response:', res.data);
  return res.data.data.exams;
};



// GET EXAM BY ID

export const getExamById = async (examId: string) => {
  const res = await api.get(`/v1/exams/${examId}`);
  console.log('Exam By ID Response:', res.data);

  return res.data.data.exam;
};



// START EXAM

export const startExam = async (examId: string) => {
  const res = await api.post(`/v1/student/exams/${examId}/start`);
  return res.data.data;
};



// GET EXAM ATTEMPT

export const getExamAttempt = async (examId: string) => {
  const res = await api.get(`/v1/student/exams/${examId}/attempt`);
  console.log('Exam Attempt Response:', res.data);
  return res.data.data;
};



// SAVE ANSWER

export const saveAnswer = async (
  examId: string,
  questionId: string,
  selectedOption: string
) => {
  const res = await api.patch(`/v1/student/exams/${examId}/answer`, {
    questionId,
    selectedOption,
  });

  return res.data;
};



// SUBMIT EXAM
export const submitExam = async (examId: string) => {
  const res = await api.post(`/v1/student/exams/${examId}/submit`);
  return res.data;
};



// GET RESULT
export const getExamResult = async (examId: string) => {
  const res = await api.get(`/v1/student/exams/${examId}/result`);
  return res.data.data;
};



// GET REVIEW
export const getExamReview = async (examId: string) => {
  const res = await api.get(`/v1/student/exams/${examId}/review`);
  return res.data.data;
};