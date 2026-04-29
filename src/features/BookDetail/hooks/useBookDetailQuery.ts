import { useQuery } from '@tanstack/react-query'
import { getBookById } from '../api'
import { mapBookDetail } from '../mapper'
import { QUERY_KEYS } from '../../../shared/lib/constants'

export const useBookDetailQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.BOOKS.DETAIL(id),
    queryFn: async () => {
      const data = await getBookById(id)
      return mapBookDetail(data)
    },
    enabled: !!id,
  })
}
