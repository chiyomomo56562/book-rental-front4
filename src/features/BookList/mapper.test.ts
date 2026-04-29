import { describe, it, expect } from 'vitest';
import { mapBook } from './mapper';
import { RawBook, BookViewModel } from './types';
import { BOOK_STATUS, BOOK_STATUS_LABEL, BOOK_STATUS_COLOR } from '../../shared/lib/constants';

describe('mapBook', () => {
  it('should map AVAILABLE status correctly', () => {
    const raw: RawBook = {
      id: '1',
      title: 'Test Book',
      status: BOOK_STATUS.AVAILABLE,
    };

    const expected: BookViewModel = {
      id: '1',
      title: 'Test Book',
      statusText: BOOK_STATUS_LABEL[BOOK_STATUS.AVAILABLE],
      isRentable: true,
      statusColor: BOOK_STATUS_COLOR[BOOK_STATUS.AVAILABLE],
    };

    expect(mapBook(raw)).toEqual(expected);
  });

  it('should map RENTED status correctly', () => {
    const raw: RawBook = {
      id: '2',
      title: 'Rented Book',
      status: BOOK_STATUS.RENTED,
    };

    const expected: BookViewModel = {
      id: '2',
      title: 'Rented Book',
      statusText: BOOK_STATUS_LABEL[BOOK_STATUS.RENTED],
      isRentable: false,
      statusColor: BOOK_STATUS_COLOR[BOOK_STATUS.RENTED],
    };

    expect(mapBook(raw)).toEqual(expected);
  });
});
