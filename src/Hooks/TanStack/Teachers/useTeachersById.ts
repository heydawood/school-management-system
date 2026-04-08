import { getSubjectsById } from '@/Services/Subjects/Subjects';
import { getTeachersById } from '@/Services/Teacher/Teacher';
import { useQuery } from '@tanstack/react-query';

export const useTeachersById = (id?: string | null) => {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: () => getTeachersById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};