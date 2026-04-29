import { RawBook, BookDetailViewModel } from './types'
import { BOOK_STATUS, BOOK_STATUS_COLOR } from '../../shared/lib/constants'

export const mapBookDetail = (data: RawBook): BookDetailViewModel => {
  const isAvailable = data.status === BOOK_STATUS.AVAILABLE

  return {
    id: data.id,
    title: data.title,
    statusLabel: isAvailable ? '현재 대여 가능' : '현재 대여 중',
    statusColor: BOOK_STATUS_COLOR[data.status],
    actionButtonText: isAvailable ? '대여하기' : '반납하기',
    canRent: isAvailable,
    canReturn: !isAvailable,
  }
}
