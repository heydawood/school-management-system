import { getAcademicTerms } from "@/Services/AdminPanel/AcademicTerms/AcademicTerms";
import { useFetch } from "../useFetch";

export const useAcademicTerms = () => {
  return useFetch({
    queryKey: ['academic-terms'],
    queryFn: getAcademicTerms,
  });
};