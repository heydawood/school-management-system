import { getExams } from "@/Services/Exams/Exams";
import { useFetch } from "../useFetch";

export const useExams = () => {
  return useFetch({
    queryKey: ['exams'],
    queryFn: getExams,
  });
};
