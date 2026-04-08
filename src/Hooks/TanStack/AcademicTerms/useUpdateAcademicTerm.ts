import { updateAcademicTerm } from "@/Services/AdminPanel/AcademicTerms/AcademicTerms";
import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";

export const useUpdateAcademicTerm = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateAcademicTerm,
    invalidateKeys: [['academic-terms']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
    onError: () => {
      customToast.error('Failed to update academic term');
    }
  });
};
