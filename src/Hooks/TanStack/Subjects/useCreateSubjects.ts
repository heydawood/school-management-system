import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createSubject } from '@/Services/Subjects/Subjects';

export const useCreateSubjects = () => {
  return useMutate({
    mutationFn: createSubject,
    invalidateKeys: [['subjects']],
    onSuccess: () => {
      customToast.success('Subject created successfully');
    },
  });
};