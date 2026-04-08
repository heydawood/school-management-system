import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { deleteSubject } from '@/Services/Subjects/Subjects';

export const useDeleteSubjects = () => {
  return useMutate<void, string>({
    mutationFn: deleteSubject,
    invalidateKeys: [['subjects']],
    onSuccess: () => {
      customToast.success('Deleted successfully');
    },
  });
};