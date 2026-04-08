import { getSubjects } from "@/Services/Subjects/Subjects";
import { useFetch } from "../useFetch";
import { getYearGroups } from "@/Services/AdminPanel/YearGroups/YearGroups";

export const useYearGroups = () => {
  return useFetch({
    queryKey: ['year-groups'],
    queryFn: getYearGroups,
  });
};