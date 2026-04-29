import { useBooksQuery } from '../useBooksQuery';
import { BookListView } from './BookListView';

export const BookListContainer = () => {
  const { data, isLoading, isError } = useBooksQuery();

  return (
    <BookListView 
      books={data ?? []} 
      isLoading={isLoading} 
      isError={isError} 
    />
  );
};
