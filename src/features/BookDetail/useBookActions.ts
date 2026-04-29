import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rentalBook, returnBook } from './api'

export const useBookActions = () => {
  const queryClient = useQueryClient()

  const rentalMutation = useMutation({
    mutationFn: rentalBook,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', id] })
      // RENTAL_HISTORY_FEATURE 가 있다면 해당 쿼리도 무효화해야 함
      queryClient.invalidateQueries({ queryKey: ['rentals', 'history', id] })
    },
  })

  const returnMutation = useMutation({
    mutationFn: returnBook,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', id] })
      queryClient.invalidateQueries({ queryKey: ['rentals', 'history', id] })
    },
  })

  return {
    rentBook: rentalMutation.mutate,
    returnBook: returnMutation.mutate,
    isActionPending: rentalMutation.isPending || returnMutation.isPending,
  }
}
