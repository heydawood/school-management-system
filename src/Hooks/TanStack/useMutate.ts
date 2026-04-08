import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutate = <TData = unknown, TVariables = void>({
  mutationFn,
  invalidateKeys,
  onSuccess,
  onError,

}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys?: any[];
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: () => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      onSuccess?.();

    },
    onError: () => {
      onError?.();
    }
  });
};
