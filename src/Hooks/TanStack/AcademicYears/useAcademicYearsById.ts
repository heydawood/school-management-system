import { getAcademicYearById } from '@/Services/AdminPanel/AcademicYears/AcademicYears';
import { useQuery } from '@tanstack/react-query';

export const useAcademicYearsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['academic-years', id],
    queryFn: () => getAcademicYearById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};