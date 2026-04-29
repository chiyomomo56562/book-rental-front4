import { useQuery } from '@tanstack/react-query'
import { getBooks } from './api'
import { mapBook } from './mapper'

export const useBooksQuery = () => {
  return useQuery({
    queryKey: ['books', 'list'],
    queryFn: async () => {
      const data = await getBooks()
      return data.map(mapBook)
    },
  })
}
