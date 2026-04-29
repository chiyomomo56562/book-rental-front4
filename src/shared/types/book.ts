export type BookStatus = 'AVAILABLE' | 'RENTED'

export interface RawBook {
  id: string
  title: string
  status: BookStatus
}
