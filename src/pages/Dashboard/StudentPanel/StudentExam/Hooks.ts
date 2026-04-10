// import { useQuery } from '@tanstack/react-query';
// import { customToast } from '@/Common/Components/ShowToast';
// import { useFetch } from '@/Hooks/TanStack/useFetch';
// import { useMutate } from '@/Hooks/TanStack/useMutate';
// import { getExamAttempt, getExamById, getExamResult, getExamReview, getStudentExams, saveAnswer, startExam, submitExam } from '@/Services/StudentExam/StudentExam';


// // GET ALL STUDENT EXAMS
// export const useStudentExams = () => {
//   return useFetch({
//     queryKey: ['student-exams'],
//     queryFn: getStudentExams,
//   });
// };


// // GET EXAM BY ID
// export const useExamById = (examId?: string | null) => {
//   return useQuery({
//     queryKey: ['exam', examId],
//     queryFn: () => getExamById(examId as string),
//     enabled: !!examId,
//   });
// };


// // START EXAM
// export const useStartExam = () => {
//   return useMutate({
//     mutationFn: (examId: string) => startExam(examId),

//     onSuccess: () => {
//       customToast.success('Exam started successfully');
//     },
//   });
// };

// // GET EXAM ATTEMPT
// export const useExamAttempt = (examId?: string | null) => {
//   return useQuery({
//     queryKey: ['exam-attempt', examId],
//     queryFn: () => getExamAttempt(examId as string),
//     enabled: !!examId,
//   });
// };

// // SAVE ANSWER
// export const useSaveAnswer = () => {
//   return useMutate({
//     mutationFn: ({
//       examId,
//       questionId,
//       selectedOption,
//     }: {
//       examId: string;
//       questionId: string;
//       selectedOption: string;
//     }) => saveAnswer(examId, questionId, selectedOption),

//     onSuccess: () => {
//       // optional: no toast to avoid spam while answering
//       // customToast.success('Answer saved');
//     },
//   });
// };


// // SUBMIT EXAM
// export const useSubmitExam = () => {
//   return useMutate({
//     mutationFn: (examId: string) => submitExam(examId),

//     onSuccess: () => {
//       customToast.success('Exam submitted successfully');
//     },
//   });
// };



// // GET EXAM RESULT
// export const useExamResult = (examId?: string | null) => {
//   return useQuery({
//     queryKey: ['exam-result', examId],
//     queryFn: () => getExamResult(examId as string),
//     enabled: !!examId,
//   });
// };



// // GET REVIEW
// export const useExamReview = (examId?: string | null) => {
//   return useQuery({
//     queryKey: ['exam-review', examId],
//     queryFn: () => getExamReview(examId as string),
//     enabled: !!examId,
//   });
// };