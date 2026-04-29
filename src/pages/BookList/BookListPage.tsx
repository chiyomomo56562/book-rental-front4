import { BookListContainer } from '../../features/BookList';
import { DefaultLayout } from '../../shared/ui/layout/DefaultLayout';

export const BookListPage = () => {
  return (
    <DefaultLayout>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">도서 목록</h1>
        <BookListContainer />
      </main>
    </DefaultLayout>
  );
};
