import { BookViewModel } from '../types';
import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner } from '../../../shared/ui';

interface BookListViewProps {
  books: BookViewModel[];
  isLoading: boolean;
  isError: boolean;
  onBookClick?: (id: number) => void;
}

export const BookListView = ({ books, isLoading, isError, onBookClick }: BookListViewProps) => {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
        데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card 
          key={book.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onBookClick?.(book.id)}
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold">{book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={book.statusColor === 'green' ? 'success' : 'danger'}>
              {book.statusText}
            </Badge>
          </CardContent>
        </Card>
      ))}
      {books.length === 0 && (
        <div className="col-span-full py-10 text-center text-gray-500">
          등록된 도서가 없습니다.
        </div>
      )}
    </div>
  );
};
