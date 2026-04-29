/** BOOK_API.md의 GET /books 응답 구조 */
export interface RawBook {
  id: string;
  title: string;
  status: 'AVAILABLE' | 'RENTED';
}

/** 컴포넌트에서 사용하는 정제된 구조 */
export interface BookViewModel {
  id: string;
  title: string;
  statusText: '대여 가능' | '대여 중';
  isRentable: boolean;
  statusColor: 'green' | 'red';
}
