import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BookListContainer } from './BookListContainer'
import { useBooksQuery } from '../hooks/useBooksQuery'

// useBooksQuery 훅 모킹
vi.mock('../hooks/useBooksQuery')

describe('BookListContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('로딩 중일 때 스피너를 표시해야 한다', () => {
    vi.mocked(useBooksQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useBooksQuery>)

    render(<BookListContainer />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('데이터 로드 성공 시 도서 목록을 표시해야 한다', () => {
    const mockBooks = [
      {
        id: '1',
        title: 'Test Book 1',
        statusText: '대여 가능',
        statusColor: 'success' as const,
        isRentable: true,
      },
      {
        id: '2',
        title: 'Test Book 2',
        statusText: '대여 중',
        statusColor: 'danger' as const,
        isRentable: false,
      },
    ]

    vi.mocked(useBooksQuery).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useBooksQuery>)

    render(<BookListContainer />)

    expect(screen.getByText('Test Book 1')).toBeInTheDocument()
    expect(screen.getByText('Test Book 2')).toBeInTheDocument()
    expect(screen.getByText('대여 가능')).toBeInTheDocument()
    expect(screen.getByText('대여 중')).toBeInTheDocument()
  })

  it('에러 발생 시 에러 메시지를 표시해야 한다', () => {
    vi.mocked(useBooksQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useBooksQuery>)

    render(<BookListContainer />)

    expect(screen.getByText(/데이터를 불러오는 중 오류가 발생했습니다/)).toBeInTheDocument()
  })
})
