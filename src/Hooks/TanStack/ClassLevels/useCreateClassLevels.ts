import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createClassLevel } from '@/Services/AdminPanel/ClassLevels/ClassLevels';

export const useCreateClassLevels = () => {
  return useMutate({
    mutationFn: createClassLevel,
    invalidateKeys: [['class-levels']],
    onSuccess: () => {
      customToast.success('Class level created successfully');
    },
  });
};