import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useBooksQuery } from './useBooksQuery'
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

describe('useBooksQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and map books correctly', async () => {
    const mockRawBooks: RawBook[] = [
      { id: '1', title: 'Book 1', status: 'AVAILABLE' },
      { id: '2', title: 'Book 2', status: 'RENTED' },
    ]

    vi.mocked(api.getBooks).mockResolvedValue(mockRawBooks)

    const { result } = renderHook(() => useBooksQuery(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(2)
    expect(result.current.data?.[0]).toEqual({
      id: '1',
      title: 'Book 1',
      statusText: '대여 가능',
      isRentable: true,
      statusColor: 'success',
    })
    expect(result.current.data?.[1]).toEqual({
      id: '2',
      title: 'Book 2',
      statusText: '대여 중',
      isRentable: false,
      statusColor: 'danger',
    })
  })

  it('should handle loading state', async () => {
    vi.mocked(api.getBooks).mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useBooksQuery(), { wrapper })

    expect(result.current.isLoading).toBe(true)
  })
})
