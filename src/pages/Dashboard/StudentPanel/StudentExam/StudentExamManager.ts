import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customToast } from '@/Common/Components/ShowToast';

import {
  getStudentExams,
  getExamById,
  startExam,
  getExamAttempt,
  saveAnswer,
  submitExam,
  getExamResult,
  getExamReview,
} from '@/Services/StudentExam/StudentExam';

export const useStudentExamManager = () => {
  const queryClient = useQueryClient();

  // GET ALL EXAMS
  const getStudentExamsQuery = () =>
    useQuery({
      queryKey: ['student-exams'],
      queryFn: getStudentExams,
    });

  // GET EXAM BY ID
  const getExamByIdQuery = (examId?: string | null) =>
    useQuery({
      queryKey: ['exam', examId],
      queryFn: () => getExamById(examId as string),
      enabled: !!examId,
    });

  // START EXAM
  const startExamMutation = useMutation({
    mutationFn: (examId: string) => startExam(examId),

    onSuccess: () => {
      customToast.success('Exam started successfully');
    },

    onError: (err: any) => {
      customToast.error(err?.message || 'Failed to start exam');
    },
  });

  // GET EXAM ATTEMPT
  const getExamAttemptQuery = (examId?: string | null) =>
    useQuery({
      queryKey: ['exam-attempt', examId],
      queryFn: () => getExamAttempt(examId as string),
      enabled: !!examId,
    });

  // SAVE ANSWER
  const saveAnswerMutation = useMutation({
    mutationFn: ({
      examId,
      questionId,
      selectedOption,
    }: {
      examId: string;
      questionId: string;
      selectedOption: string;
    }) => saveAnswer(examId, questionId, selectedOption),

    onError: (err: any) => {
      customToast.error(err?.message || 'Failed to save answer');
    },
  });

  // SUBMIT EXAM
  const submitExamMutation = useMutation({
    mutationFn: (examId: string) => submitExam(examId),

    onSuccess: () => {
      customToast.success('Exam submitted successfully');

      
      queryClient.invalidateQueries({ queryKey: ['student-exams'] });
    },

    onError: (err: any) => {
      customToast.error(err?.message || 'Failed to submit exam');
    },
  });

  // GET RESULT
  const getExamResultQuery = (examId?: string | null) =>
    useQuery({
      queryKey: ['exam-result', examId],
      queryFn: () => getExamResult(examId as string),
      enabled: !!examId,
    });

  // GET REVIEW
  const getExamReviewQuery = (examId?: string | null) =>
    useQuery({
      queryKey: ['exam-review', examId],
      queryFn: () => getExamReview(examId as string),
      enabled: !!examId,
    });

  return {
    // queries
    getStudentExamsQuery,
    getExamByIdQuery,
    getExamAttemptQuery,
    getExamResultQuery,
    getExamReviewQuery,

    // mutations
    startExamMutation,
    saveAnswerMutation,
    submitExamMutation,
  };
};
