import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";
import { updateSubject } from "@/Services/Subjects/Subjects";

export const useUpdateSubjects = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateSubject,
    invalidateKeys: [['subjects']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
  });
};