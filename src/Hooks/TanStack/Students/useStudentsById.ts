import { getStudentsById } from '@/Services/Students/Students';
import { useQuery } from '@tanstack/react-query';

export const useStudentsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => getStudentsById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};