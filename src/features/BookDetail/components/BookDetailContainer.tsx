import { useNavigate } from 'react-router-dom'
import { useBookDetailQuery } from '../hooks/useBookDetailQuery'
import { useBookActions } from '../hooks/useBookActions'
import { BookDetailView } from './BookDetailView'

interface BookDetailContainerProps {
  id: string
}

export const BookDetailContainer = ({ id }: BookDetailContainerProps) => {
  const navigate = useNavigate()
  const { data: book, isLoading, isError } = useBookDetailQuery(id)
  const { rentBook, returnBook, isActionPending } = useBookActions()

  const handleRent = (bookId: string) => {
    rentBook(bookId)
  }

  const handleReturn = (bookId: string) => {
    returnBook(bookId)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <BookDetailView
      book={book}
      isLoading={isLoading || isActionPending}
      isError={isError}
      onRent={handleRent}
      onReturn={handleReturn}
      onBack={handleBack}
    />
  )
}
