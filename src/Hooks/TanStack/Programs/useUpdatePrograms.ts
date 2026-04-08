import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";
import { updateProgram } from "@/Services/AdminPanel/Programs/Programs";

export const useUpdatePrograms = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateProgram,
    invalidateKeys: [['programs']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
  });
};