import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createStudent } from '@/Services/Students/Students';

export const useCreateStudents = () => {
  return useMutate({
    mutationFn: createStudent,
    invalidateKeys: [['students']],
    onSuccess: () => {
      customToast.success('Student created successfully');
    },
  });
};