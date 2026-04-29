export interface RawRentalHistory {
  id: string;
  rentedAt: string; // ISO 8601
  returnedAt: string | null; // ISO 8601
}

export interface RentalHistoryViewModel {
  id: string;
  rentedDateText: string; // '2024.04.27 10:00'
  returnedDateText: string; // '2024.04.27 15:00' 또는 '대여 중'
  isCurrentlyRented: boolean;
  rentedAt: string; // sorting용
}
