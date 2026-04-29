import { BookDetailViewModel } from '../types'
import { Card, Button, Badge, Spinner, ErrorView } from '@/shared/ui'

interface BookDetailViewProps {
  book?: BookDetailViewModel
  isLoading: boolean
  isError: boolean
  onRent: (id: string) => void
  onReturn: (id: string) => void
  onBack: () => void
}

export const BookDetailView = ({
  book,
  isLoading,
  isError,
  onRent,
  onReturn,
  onBack,
}: BookDetailViewProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError || !book) {
    return <ErrorView message="도서 정보를 불러오는데 실패했습니다." onRetry={onBack} />
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          &larr; 뒤로 가기
        </Button>
      </div>

      <Card className="p-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <Badge variant={book.canRent ? 'success' : 'warning'}>{book.statusLabel}</Badge>
          </div>

          <div className="border-t border-b py-6 text-gray-600">
            <p>도서 ID: {book.id}</p>
            {/* 추가 상세 정보가 필요하다면 여기에 추가 */}
          </div>

          <div className="flex gap-4">
            {book.canRent && (
              <Button className="flex-1" variant="primary" onClick={() => onRent(book.id)}>
                {book.actionButtonText}
              </Button>
            )}
            {book.canReturn && (
              <Button className="flex-1" variant="secondary" onClick={() => onReturn(book.id)}>
                {book.actionButtonText}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
