import { RawBookDetail, BookDetailViewModel } from './types'

export const mapBookDetail = (data: RawBookDetail): BookDetailViewModel => {
  const isAvailable = data.status === 'AVAILABLE'

  return {
    id: data.id,
    title: data.title,
    statusLabel: isAvailable ? '현재 대여 가능' : '현재 대여 중',
    actionButtonText: isAvailable ? '대여하기' : '반납하기',
    canRent: isAvailable,
    canReturn: !isAvailable,
  }
}
