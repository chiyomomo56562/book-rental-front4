import { describe, it, expect } from 'vitest';
import { mapBookDetail } from './mapper';
import { RawBookDetail, BookDetailViewModel } from './types';

describe('BookDetail Mapper', () => {
  it('should map AVAILABLE status correctly', () => {
    const rawData: RawBookDetail = {
      id: '1',
      title: 'Test Book',
      status: 'AVAILABLE',
    };

    const expected: BookDetailViewModel = {
      id: '1',
      title: 'Test Book',
      statusLabel: '현재 대여 가능',
      actionButtonText: '대여하기',
      canRent: true,
      canReturn: false,
    };

    expect(mapBookDetail(rawData)).toEqual(expected);
  });

  it('should map RENTED status correctly', () => {
    const rawData: RawBookDetail = {
      id: '2',
      title: 'Borrowed Book',
      status: 'RENTED',
    };

    const expected: BookDetailViewModel = {
      id: '2',
      title: 'Borrowed Book',
      statusLabel: '현재 대여 중',
      actionButtonText: '반납하기',
      canRent: false,
      canReturn: true,
    };

    expect(mapBookDetail(rawData)).toEqual(expected);
  });
});
