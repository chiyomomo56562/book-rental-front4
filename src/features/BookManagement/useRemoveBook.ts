import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from './api';
import { QUERY_KEYS } from '../../shared/lib/constants';
import { useNavigate } from 'react-router-dom';

export const useRemoveBook = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKS.LIST });
      navigate('/');
    },
  });
};
