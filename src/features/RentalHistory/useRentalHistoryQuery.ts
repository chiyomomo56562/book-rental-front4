import { useQuery } from '@tanstack/react-query';
import { getRentalHistory } from './api';
import { mapRentalHistory } from './mapper';
import { RentalHistoryViewModel } from './types';

export const useRentalHistoryQuery = (bookId: string) => {
  return useQuery({
    queryKey: ['books', 'rentals', bookId],
    queryFn: async () => {
      const { data } = await getRentalHistory(bookId);
      return data
        .map(mapRentalHistory)
        .sort((a: RentalHistoryViewModel, b: RentalHistoryViewModel) => 
          new Date(b.rentedAt).getTime() - new Date(a.rentedAt).getTime()
        );
    },

    enabled: !!bookId,
  });
};
