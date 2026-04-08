import { getProgramsById } from '@/Services/AdminPanel/Programs/Programs';
import { useQuery } from '@tanstack/react-query';

export const useProgramsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['programs', id],
    queryFn: () => getProgramsById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};