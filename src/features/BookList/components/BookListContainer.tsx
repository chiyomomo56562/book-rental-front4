import { useBooksQuery } from '../useBooksQuery'
import { BookListView } from './BookListView'

interface BookListContainerProps {
  onBookClick?: (id: number) => void
}

export const BookListContainer = ({ onBookClick }: BookListContainerProps) => {
  const { data, isLoading, isError } = useBooksQuery()

  return (
    <BookListView
      books={data ?? []}
      isLoading={isLoading}
      isError={isError}
      onBookClick={onBookClick}
    />
  )
}
