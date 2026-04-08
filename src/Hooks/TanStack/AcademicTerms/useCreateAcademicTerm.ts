import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createAcademicTerm } from '@/Services/AdminPanel/AcademicTerms/AcademicTerms';

export const useCreateAcademicTerm = () => {
  return useMutate({
    mutationFn: createAcademicTerm,
    invalidateKeys: [['academic-terms']],
    onSuccess: () => {
      customToast.success('Academic term created successfully');
    },
    onError: () => {
      customToast.error('Failed to create academic term');
    }
  });
};
