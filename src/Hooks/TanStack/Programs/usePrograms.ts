import { useFetch } from "../useFetch";
import { getPrograms } from "@/Services/AdminPanel/Programs/Programs";

export const usePrograms = () => {
  return useFetch({
    queryKey: ['programs'],
    queryFn: getPrograms,
  });
};