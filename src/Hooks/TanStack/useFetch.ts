import { useQuery } from '@tanstack/react-query';

export const useFetch = <T>({
  queryKey,
  queryFn,
}: {
  queryKey: any[];
  queryFn: () => Promise<T>;
}) => {
  return useQuery({
    queryKey,
    queryFn,
  });
};
