import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";
import { updateYearGroup } from "@/Services/AdminPanel/YearGroups/YearGroups";

export const useUpdateYearGroups = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateYearGroup,
    invalidateKeys: [['year-groups']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
  });
};