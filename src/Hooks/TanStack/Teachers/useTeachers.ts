import { useFetch } from "../useFetch";
import { getTeachers } from "@/Services/Teacher/Teacher";

export const useTeachers = () => {
  return useFetch({
    queryKey: ['teachers'],
    queryFn: getTeachers,
  });
};