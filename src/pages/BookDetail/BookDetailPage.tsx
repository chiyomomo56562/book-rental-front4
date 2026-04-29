import { useParams, ScrollRestoration } from 'react-router-dom'
import { BookDetailContainer } from '../../features/BookDetail'
import { DefaultLayout } from '../../shared/ui/layout/DefaultLayout'

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>()

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
            <div className="p-8 bg-white rounded-lg border border-gray-200 text-center text-gray-500 italic">
              준비 중...
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">대여 이력</h2>
            <div className="p-8 bg-white rounded-lg border border-gray-200 text-center text-gray-500 italic">
              준비 중...
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  )
}
