import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { deleteClassLevel } from '@/Services/AdminPanel/ClassLevels/ClassLevels';

export const useDeleteClassLevels = () => {
  return useMutate<void, string>({
    mutationFn: deleteClassLevel,
    invalidateKeys: [['class-levels']],
    onSuccess: () => {
      customToast.success('Deleted successfully');
    },
  });
};