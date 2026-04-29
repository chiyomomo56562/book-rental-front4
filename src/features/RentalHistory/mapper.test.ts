import { describe, it, expect } from 'vitest';
import { mapRentalHistory } from './mapper';
import { RawRentalHistory } from './types';

describe('RentalHistory Mapper', () => {
  it('should correctly map raw rental history to view model', () => {
    const rawData: RawRentalHistory = {
      id: '1',
      rentedAt: '2024-04-27T10:00:00Z',
      returnedAt: '2024-04-27T15:00:00Z',
    };

    const result = mapRentalHistory(rawData);

    expect(result).toEqual({
      id: '1',
      rentedDateText: '2024.04.27 19:00',
      returnedDateText: '2024.04.28 00:00',
      isCurrentlyRented: false,
      rentedAt: '2024-04-27T10:00:00Z',
    });
  });

  it('should handle "대여 중" when returnedAt is null', () => {
    const rawData: RawRentalHistory = {
      id: '2',
      rentedAt: '2024-04-28T09:00:00Z',
      returnedAt: null,
    };

    const result = mapRentalHistory(rawData);

    expect(result).toEqual({
      id: '2',
      rentedDateText: '2024.04.28 18:00',
      returnedDateText: '대여 중',
      isCurrentlyRented: true,
      rentedAt: '2024-04-28T09:00:00Z',
    });
  });
});
