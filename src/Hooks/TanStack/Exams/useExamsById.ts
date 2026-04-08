import { getExamById } from "@/Services/Exams/Exams";
import { useQuery } from "@tanstack/react-query";

export const useExamById = (id?: string | null) => {
  return useQuery({
    queryKey: ['exams', id],
    queryFn: () => getExamById(id as string),
    enabled: !!id,
  });
};