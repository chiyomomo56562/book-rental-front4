import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRentalHistoryQuery } from './useRentalHistoryQuery';
import * as api from './api';
import { RawRentalHistory } from './types';

vi.mock('./api');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useRentalHistoryQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch, map, and sort rental history correctly', async () => {
    const mockRawData: RawRentalHistory[] = [
      {
        id: '1',
        rentedAt: '2024-04-27T10:00:00Z',
        returnedAt: '2024-04-27T15:00:00Z',
      },
      {
        id: '2',
        rentedAt: '2024-04-28T09:00:00Z',
        returnedAt: null,
      },
    ];

    vi.mocked(api.getRentalHistory).mockResolvedValue({
      status: 200,
      data: mockRawData,
      error: null,
    });

    const { result } = renderHook(() => useRentalHistoryQuery('book-123'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 최신순 정렬 확인 (ID 2가 먼저 와야 함)
    expect(result.current.data?.[0].id).toBe('2');
    expect(result.current.data?.[1].id).toBe('1');
    
    // 매핑 확인
    expect(result.current.data?.[0].returnedDateText).toBe('대여 중');
    expect(result.current.data?.[0].isCurrentlyRented).toBe(true);
    expect(result.current.data?.[1].returnedDateText).toBe('2024.04.28 00:00'); // KST 기준
  });
});
