import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRegisterBookMutation } from './useRegisterBookMutation';
import * as api from '../api';
import { QUERY_KEYS } from '@/shared/lib/constants';
import { RawBook } from '@/shared/types/book';

vi.mock('../api');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe('useRegisterBookMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('도서 등록이 성공하면 registerBook API를 호출하고 쿼리를 무효화해야 한다', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const mockBook = { id: 'new-id', title: 'New Book', status: 'AVAILABLE' } as RawBook;
    vi.mocked(api.registerBook).mockResolvedValue(mockBook);

    const { result } = renderHook(() => useRegisterBookMutation(), { wrapper });

    await result.current.mutateAsync({ title: 'New Book' });

    expect(api.registerBook).toHaveBeenCalledWith({ title: 'New Book' });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.BOOKS.LIST });
  });

  it('입력값의 공백이 제거되어 API로 전송되어야 한다', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const mockBook = { id: 'new-id', title: 'New Book', status: 'AVAILABLE' } as RawBook;
    vi.mocked(api.registerBook).mockResolvedValue(mockBook);

    const { result } = renderHook(() => useRegisterBookMutation(), { wrapper });

    await result.current.mutateAsync({ title: '  Trimmed Book  ' });

    expect(api.registerBook).toHaveBeenCalledWith({ title: 'Trimmed Book' });
  });

  it('이미 존재하는 도서 등록 시 에러를 반환해야 한다', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const apiError = {
      status: 409,
      message: '이미 존재하는 도서입니다.',
      code: 'DUPLICATE_BOOK',
    };
    vi.mocked(api.registerBook).mockRejectedValue(apiError);

    const { result } = renderHook(() => useRegisterBookMutation(), { wrapper });

    await expect(result.current.mutateAsync({ title: 'Existing Book' })).rejects.toEqual(apiError);
  });
});
