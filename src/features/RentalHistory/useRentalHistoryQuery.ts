import { useQuery } from '@tanstack/react-query';
import { getRentalHistory } from './api';
import { mapRentalHistory } from './mapper';

export const useRentalHistoryQuery = (bookId: string) => {
  return useQuery({
    queryKey: ['books', 'rentals', bookId],
    queryFn: async () => {
      const response = await getRentalHistory(bookId);
      return response.data
        .map(mapRentalHistory)
        .sort((a, b) => new Date(b.rentedAt).getTime() - new Date(a.rentedAt).getTime());
    },
    enabled: !!bookId,
  });
};
