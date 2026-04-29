import { RawBook, BookViewModel } from './types'
import { BOOK_STATUS, BOOK_STATUS_LABEL, BOOK_STATUS_COLOR } from '../../shared/lib/constants'

export const mapBook = (data: RawBook): BookViewModel => {
  const isAvailable = data.status === BOOK_STATUS.AVAILABLE

  return {
    id: data.id,
    title: data.title,
    statusText: BOOK_STATUS_LABEL[data.status],
    isRentable: isAvailable,
    statusColor: BOOK_STATUS_COLOR[data.status],
  }
}
