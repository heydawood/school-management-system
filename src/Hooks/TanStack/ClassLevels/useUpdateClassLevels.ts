import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";
import { updateClassLevel } from "@/Services/AdminPanel/ClassLevels/ClassLevels";

export const useUpdateClassLevels = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateClassLevel,
    invalidateKeys: [['class-levels']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
  });
};