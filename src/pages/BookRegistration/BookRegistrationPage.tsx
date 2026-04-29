import { useNavigate } from 'react-router-dom';
import { BookRegistrationContainer } from '../../features/BookRegistration';
import { DefaultLayout } from '../../shared/ui/layout/DefaultLayout';
import { Button } from '../../shared/ui';

export const BookRegistrationPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <DefaultLayout>
      <main className="container mx-auto p-4 flex justify-center">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6">새로운 도서 등록</h1>
          <BookRegistrationContainer />
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};
