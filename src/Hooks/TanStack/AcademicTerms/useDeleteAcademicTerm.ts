import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { deleteAcademicTerm } from '@/Services/AdminPanel/AcademicTerms/AcademicTerms';

export const useDeleteAcademicTerm = () => {
  return useMutate<void, string>({
    mutationFn: deleteAcademicTerm,
    invalidateKeys: [['academic-terms']],
    onSuccess: () => {
      customToast.success('Deleted successfully');
    },
    onError: () => {
      customToast.error('Failed to delete academic term');
    }
  });
};
