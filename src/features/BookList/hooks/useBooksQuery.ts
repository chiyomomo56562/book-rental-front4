import { useQuery } from '@tanstack/react-query'
import { getBooks } from '../api'
import { mapBook } from '../mapper'
import { QUERY_KEYS } from '@/shared/lib/constants'

export const useBooksQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BOOKS.LIST,
    queryFn: async () => {
      const data = await getBooks()
      return data.map(mapBook)
    },
  })
}
