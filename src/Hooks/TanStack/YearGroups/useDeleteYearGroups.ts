import { customToast } from '@/Common/Components/ShowToast';
import { useMutate } from '../useMutate';
import { deleteYearGroup } from '@/Services/AdminPanel/YearGroups/YearGroups';

export const useDeleteYearGroups = () => {
  return useMutate<void, string>({
    mutationFn: deleteYearGroup,
    invalidateKeys: [['year-groups']],
    onSuccess: () => {
      customToast.success('Deleted successfully');
    },
  });
};