import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createExam } from '@/Services/Exams/Exams';

export const auseCreateExams = () => {
  return useMutate({
    mutationFn: createExam,
    invalidateKeys: [['exams']],
    onSuccess: () => {
      customToast.success('Exam created. Now add questions');
    },
  });
};