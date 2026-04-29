import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRenameBook } from './useRenameBook';
import * as api from './api';
import { QUERY_KEYS } from '../../shared/lib/constants';
import { AxiosResponse } from 'axios';

vi.mock('./api');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe('useRenameBook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  it('도서 제목 수정이 성공하면 renameBookTitle API를 호출하고 관련 쿼리를 무효화해야 한다', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    
    const wrapperWithSpy = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const bookId = 'test-id';
    const newTitle = 'Updated Title';
    vi.mocked(api.renameBookTitle).mockResolvedValue({ data: { id: bookId, title: newTitle } } as unknown as AxiosResponse);

    const { result } = renderHook(() => useRenameBook(bookId), { wrapper: wrapperWithSpy });

    await result.current.mutateAsync({ title: newTitle });

    expect(api.renameBookTitle).toHaveBeenCalledWith(bookId, { title: newTitle });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.BOOKS.DETAIL(bookId) });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.BOOKS.LIST });
  });

  it('빈 제목으로 수정을 시도하면 에러를 반환해야 한다', async () => {
    const { result } = renderHook(() => useRenameBook('id'), { wrapper });

    await expect(result.current.mutateAsync({ title: '' })).rejects.toThrow('제목은 필수입니다.');
    expect(api.renameBookTitle).not.toHaveBeenCalled();
  });
});
