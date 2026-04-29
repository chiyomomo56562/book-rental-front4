import { format } from 'date-fns';
import { RawRentalHistory, RentalHistoryViewModel } from './types';

export const mapRentalHistory = (data: RawRentalHistory): RentalHistoryViewModel => {
  return {
    id: data.id,
    rentedDateText: format(new Date(data.rentedAt), 'yyyy.MM.dd HH:mm'),
    returnedDateText: data.returnedAt
      ? format(new Date(data.returnedAt), 'yyyy.MM.dd HH:mm')
      : '대여 중',
    isCurrentlyRented: data.returnedAt === null,
    rentedAt: data.rentedAt,
  };
};
