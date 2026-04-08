import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";
import { updateQuestion } from "@/Services/Questions/Questions";

export const useUpdateQuestions = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateQuestion,
    invalidateKeys: [['questions']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
  });
};