import { getAcademicTermById } from '@/Services/AdminPanel/AcademicTerms/AcademicTerms';
import { useQuery } from '@tanstack/react-query';

export const useAcademicTermById = (id?: string | null) => {
  return useQuery({
    queryKey: ['academic-terms', id],
    queryFn: () => getAcademicTermById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};
