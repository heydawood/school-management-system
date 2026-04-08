import { getSubjectsById } from '@/Services/Subjects/Subjects';
import { useQuery } from '@tanstack/react-query';

export const useSubjectsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['subjects', id],
    queryFn: () => getSubjectsById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};