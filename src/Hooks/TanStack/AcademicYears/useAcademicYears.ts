import { useFetch } from "../useFetch";
import { getAcademicYears } from "@/Services/AdminPanel/AcademicYears/AcademicYears";

export const useAcademicYears = () => {
  return useFetch({
    queryKey: ['academic-years'],
    queryFn: getAcademicYears,
  });
};