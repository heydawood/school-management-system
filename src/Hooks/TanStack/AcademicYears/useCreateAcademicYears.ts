import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createAcademicYear } from '@/Services/AdminPanel/AcademicYears/AcademicYears';

export const useCreateAcademicYears = () => {
  return useMutate({
    mutationFn: createAcademicYear,
    invalidateKeys: [['academic-years']],
    onSuccess: () => {
      customToast.success('Academic year created successfully');
    },
  });
};