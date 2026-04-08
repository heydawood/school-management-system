import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { deleteAcademicYear } from '@/Services/AdminPanel/AcademicYears/AcademicYears';

export const useDeleteAcademicYears = () => {
  return useMutate<void, string>({
    mutationFn: deleteAcademicYear,
    invalidateKeys: [['academic-years']],
    onSuccess: () => {
      customToast.success('Deleted successfully');
    },
  });
};