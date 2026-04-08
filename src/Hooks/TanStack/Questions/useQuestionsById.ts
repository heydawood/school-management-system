import { getProgramsById } from '@/Services/AdminPanel/Programs/Programs';
import { getQuestionById } from '@/Services/Questions/Questions';
import { useQuery } from '@tanstack/react-query';

export const useQuestionsById = (id?: string | null) => {
  return useQuery({
    queryKey: ['questions', id],
    queryFn: () => getQuestionById(id as string),

    //IMPORTANT: only run when id exists this prevets the query from running with an undefined or null id, preventing unnecessary API calls
    enabled: !!id,
  });
};