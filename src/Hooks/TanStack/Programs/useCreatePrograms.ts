import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createProgram } from '@/Services/AdminPanel/Programs/Programs';

export const useCreatePrograms = () => {
  return useMutate({
    mutationFn: createProgram,
    invalidateKeys: [['programs']],
    onSuccess: () => {
      customToast.success('Program created successfully');
    },
  });
};