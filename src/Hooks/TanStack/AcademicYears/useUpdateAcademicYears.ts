import { useMutate } from "../useMutate";
import { customToast } from "@/Common/Components/ShowToast";
import { updateAcademicYear } from "@/Services/AdminPanel/AcademicYears/AcademicYears";

export const useUpdateAcademicYears = () => {
  return useMutate<
    any,
    { id: string; data: { name: string; description: string } }
  >({
    mutationFn: updateAcademicYear,
    invalidateKeys: [['academic-years']],
    onSuccess: () => {
      customToast.success('Updated successfully');
    },
  });
};
