import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createTeachers } from '@/Services/Teacher/Teacher';

export const useCreateTeachers = () => {
  return useMutate({
    mutationFn: createTeachers,
    invalidateKeys: [['teachers']],
    onSuccess: () => {
      customToast.success('Teacher created successfully');
    },
  });
};