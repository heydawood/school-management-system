import { getYearGroupsById } from '@/Services/AdminPanel/YearGroups/YearGroups';
import { useQuery } from '@tanstack/react-query';

export const useYearGroupsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['year-groups', id],
    queryFn: () => getYearGroupsById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};