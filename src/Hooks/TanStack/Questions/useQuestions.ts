import { getQuestions } from "@/Services/Questions/Questions";
import { useFetch } from "../useFetch";

export const useQuestions = () => {
  return useFetch({
    queryKey: ['questions'],
    queryFn: getQuestions,
  });
};