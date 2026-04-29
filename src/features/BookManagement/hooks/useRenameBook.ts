import { useMutation, useQueryClient } from '@tanstack/react-query';
import { renameBookTitle } from '../api';
import { QUERY_KEYS } from '../../../shared/lib/constants';
import { RenameBookTitleRequest } from '../types';

export const useRenameBook = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: RenameBookTitleRequest) => {
      if (!request.title.trim()) {
        throw new Error('제목은 필수입니다.');
      }
      return renameBookTitle(id, request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKS.DETAIL(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKS.LIST });
    },
  });
};
