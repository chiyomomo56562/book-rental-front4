import { useParams, ScrollRestoration } from 'react-router-dom'
import { BookDetailContainer, useBookDetailQuery } from '../../features/BookDetail'
import { BookManagement } from '../../features/BookManagement'
import { RentalHistory } from '../../features/RentalHistory'
import { DefaultLayout } from '../../shared/ui/layout/DefaultLayout'

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: book } = useBookDetailQuery(id ?? '')

  if (!id) {
    return (
      <DefaultLayout>
        <div className="container mx-auto p-4">
          <p>잘못된 접근입니다. 도서 ID가 없습니다.</p>
        </div>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <ScrollRestoration />
      <main className="container mx-auto p-4 space-y-8">
        <section>
          <BookDetailContainer id={id} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">관리 기능</h2>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              {book ? (
                <BookManagement bookId={id} initialTitle={book.title} />
              ) : (
                <div className="h-20 animate-pulse bg-gray-100 rounded" />
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">대여 이력</h2>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <RentalHistory bookId={id} />
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  )
}
