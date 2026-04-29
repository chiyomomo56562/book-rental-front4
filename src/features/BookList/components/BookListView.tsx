import { BookViewModel } from '../types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Spinner,
  ErrorView,
  EmptyView,
} from '../../../shared/ui'

interface BookListViewProps {
  books: BookViewModel[]
  isLoading: boolean
  isError: boolean
  onBookClick?: (id: number) => void
}

export const BookListView = ({ books, isLoading, isError, onBookClick }: BookListViewProps) => {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError) {
    return <ErrorView />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card
          key={book.id}
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onBookClick?.(Number(book.id))}
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold">{book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={book.statusColor}>{book.statusText}</Badge>
          </CardContent>
        </Card>
      ))}
      {books.length === 0 && <EmptyView message="등록된 도서가 없습니다." />}
    </div>
  )
}
