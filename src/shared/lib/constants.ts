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

export const QUERY_KEYS = {
  BOOKS: {
    ALL: ['books'] as const,
    LIST: ['books', 'list'] as const,
    DETAILS: () => ['books', 'detail'] as const,
    DETAIL: (id: string) => ['books', 'detail', id] as const,
  },
  RENTALS: {
    ALL: ['rentals'] as const,
    HISTORY: (bookId: string) => ['rentals', 'history', bookId] as const,
  },
} as const
