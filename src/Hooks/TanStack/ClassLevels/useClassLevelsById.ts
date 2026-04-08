import { getClassLevelsById } from '@/Services/AdminPanel/ClassLevels/ClassLevels';
import { useQuery } from '@tanstack/react-query';

export const useClassLevelsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['class-levels', id],
    queryFn: () => getClassLevelsById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};