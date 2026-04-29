import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useBookDetailQuery } from './useBookDetailQuery'
import * as api from './api'
import { RawBook } from './types'

// API 모킹
vi.mock('./api')

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useBookDetailQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and map book detail correctly', async () => {
    const mockRawBook: RawBook = {
      id: '1',
      title: 'Test Book',
      status: 'AVAILABLE',
    }

    vi.mocked(api.getBookById).mockResolvedValue(mockRawBook)

    const { result } = renderHook(() => useBookDetailQuery('1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual({
      id: '1',
      title: 'Test Book',
      statusLabel: '현재 대여 가능',
      statusColor: 'success',
      actionButtonText: '대여하기',
      canRent: true,
      canReturn: false,
    })
    expect(api.getBookById).toHaveBeenCalledWith('1')
  })

  it('should handle loading state', async () => {
    vi.mocked(api.getBookById).mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useBookDetailQuery('1'), { wrapper })

    expect(result.current.isLoading).toBe(true)
  })
})
