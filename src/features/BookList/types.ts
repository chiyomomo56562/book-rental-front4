import { RawBook } from '../../shared/types/book'

export type { RawBook }

/** 컴포넌트에서 사용하는 정제된 구조 */
export interface BookViewModel {
  id: string
  title: string
  statusText: string
  isRentable: boolean
  statusColor: 'success' | 'danger'
}
