import { getSubjects } from "@/Services/Subjects/Subjects";
import { useFetch } from "../useFetch";

export const useSubjects = () => {
  return useFetch({
    queryKey: ['subjects'],
    queryFn: getSubjects,
  });
};