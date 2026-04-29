import { useNavigate, ScrollRestoration } from 'react-router-dom';
import { BookListContainer } from '../../features/BookList';
import { DefaultLayout } from '../../shared/ui/layout/DefaultLayout';
import { Button } from '../../shared/ui';

export const BookListPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/books/register');
  };

  const handleBookClick = (id: number) => {
    navigate(`/books/${id}`);
  };

  return (
    <DefaultLayout>
      <ScrollRestoration />
      <main className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">도서 목록</h1>
          <Button onClick={handleRegisterClick}>도서 등록</Button>
        </div>
        <BookListContainer onBookClick={handleBookClick} />
      </main>
    </DefaultLayout>
  );
};
