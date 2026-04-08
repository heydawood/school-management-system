import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { createYearGroup } from '@/Services/AdminPanel/YearGroups/YearGroups';

export const useCreateYearGroups = () => {
  return useMutate({
    mutationFn: createYearGroup,
    invalidateKeys: [['year-groups']],
    onSuccess: () => {
      customToast.success('Year Group created successfully');
    },
  });
};