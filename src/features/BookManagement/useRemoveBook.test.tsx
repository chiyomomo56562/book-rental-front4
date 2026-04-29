import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRemoveBook } from './useRemoveBook';
import * as api from './api';
import { QUERY_KEYS } from '../../shared/lib/constants';
import { useNavigate } from 'react-router-dom';

vi.mock('./api');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe('useRemoveBook', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('도서 삭제가 성공하면 deleteBook API를 호출하고 쿼리를 무효화하며 홈으로 이동해야 한다', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    
    const wrapperWithSpy = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const bookId = 'test-id';
    vi.mocked(api.deleteBook).mockResolvedValue({ id: bookId });

    const { result } = renderHook(() => useRemoveBook(bookId), { wrapper: wrapperWithSpy });

    await result.current.mutateAsync();

    expect(api.deleteBook).toHaveBeenCalledWith(bookId);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.BOOKS.LIST });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
