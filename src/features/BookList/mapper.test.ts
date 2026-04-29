import { describe, it, expect } from 'vitest';
import { mapBook } from './mapper';
import { RawBook, BookViewModel } from './types';

describe('mapBook', () => {
  it('should map AVAILABLE status correctly', () => {
    const raw: RawBook = {
      id: '1',
      title: 'Test Book',
      status: 'AVAILABLE',
    };

    const expected: BookViewModel = {
      id: '1',
      title: 'Test Book',
      statusText: '대여 가능',
      isRentable: true,
      statusColor: 'green',
    };

    expect(mapBook(raw)).toEqual(expected);
  });

  it('should map RENTED status correctly', () => {
    const raw: RawBook = {
      id: '2',
      title: 'Rented Book',
      status: 'RENTED',
    };

    const expected: BookViewModel = {
      id: '2',
      title: 'Rented Book',
      statusText: '대여 중',
      isRentable: false,
      statusColor: 'red',
    };

    expect(mapBook(raw)).toEqual(expected);
  });
});
