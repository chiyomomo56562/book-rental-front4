export const BOOK_STATUS = {
  AVAILABLE: 'AVAILABLE',
  RENTED: 'RENTED',
} as const

export const BOOK_STATUS_LABEL = {
  [BOOK_STATUS.AVAILABLE]: '대여 가능',
  [BOOK_STATUS.RENTED]: '대여 중',
} as const

export const BOOK_STATUS_COLOR = {
  [BOOK_STATUS.AVAILABLE]: 'success',
  [BOOK_STATUS.RENTED]: 'danger',
} as const
