import { RawBook, BookViewModel } from './types';

export const mapBook = (data: RawBook): BookViewModel => {
  const isAvailable = data.status === 'AVAILABLE';

  return {
    id: data.id,
    title: data.title,
    statusText: isAvailable ? '대여 가능' : '대여 중',
    isRentable: isAvailable,
    statusColor: isAvailable ? 'green' : 'red',
  };
};
