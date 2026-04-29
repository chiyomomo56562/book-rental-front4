import { useQuery } from '@tanstack/react-query'
import { getBookById } from './api'
import { mapBookDetail } from './mapper'

export const useBookDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['books', 'detail', id],
    queryFn: async () => {
      const data = await getBookById(id)
      return mapBookDetail(data)
    },
    enabled: !!id,
  })
}
