import { getClassLevels } from "@/Services/AdminPanel/ClassLevels/ClassLevels";
import { useFetch } from "../useFetch";

export const useClassLevels = () => {
  return useFetch({
    queryKey: ['class-levels'],
    queryFn: getClassLevels,
  });
};