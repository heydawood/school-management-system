import { getStudents } from "@/Services/Students/Students";
import { useFetch } from "../useFetch";

export const useStudents = () => {
  return useFetch({
    queryKey: ['students'],
    queryFn: getStudents,
  });
};