import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerBook } from '../api';
import { CreateBookRequest } from '../types';
import { QUERY_KEYS } from '../../../shared/lib/constants';

export const useRegisterBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateBookRequest) => {
      const transformedParams = {
        ...params,
        title: params.title.trim(),
      };
      return registerBook(transformedParams);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BOOKS.LIST,
      });
    },
  });
};
