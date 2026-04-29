/** 서버 도서 모델 */
export interface RawBookDetail {
  id: string;
  title: string;
  status: 'AVAILABLE' | 'RENTED';
}

/** 상세 뷰용 모델 */
export interface BookDetailViewModel {
  id: string;
  title: string;
  statusLabel: string;
  actionButtonText: '대여하기' | '반납하기';
  canRent: boolean;
  canReturn: boolean;
}
