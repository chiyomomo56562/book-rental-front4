import { RawBook } from '@/shared/types/book'

export type { RawBook }

/** 상세 뷰용 모델 */
export interface BookDetailViewModel {
  id: string
  title: string
  statusLabel: string
  statusColor: 'success' | 'danger' | 'warning'
  actionButtonText: '대여하기' | '반납하기'
  canRent: boolean
  canReturn: boolean
}
