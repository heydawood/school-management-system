import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createQuestion } from '@/Services/Questions/Questions';

export const useCreateQuestions = () => {
  return useMutate({
    mutationFn: createQuestion,
    invalidateKeys: [['questions']],
    onSuccess: () => {
      customToast.success('Question created successfully');
    },
  });
};