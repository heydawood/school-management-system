import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { deleteProgram } from '@/Services/AdminPanel/Programs/Programs';

export const useDeletePrograms = () => {
  return useMutate<void, string>({
    mutationFn: deleteProgram,
    invalidateKeys: [['programs']],
    onSuccess: () => {
      customToast.success('Deleted successfully');
    },
  });
};