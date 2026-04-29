import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BookDetailContainer } from './BookDetailContainer'
import { useBookDetailQuery } from '../hooks/useBookDetailQuery'
import { useBookActions } from '../hooks/useBookActions'
import { useNavigate } from 'react-router-dom'

vi.mock('../hooks/useBookDetailQuery')
vi.mock('../hooks/useBookActions')
vi.mock('react-router-dom')

describe('BookDetailContainer', () => {
  const mockId = 'book-1'
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('로딩 중일 때 스피너를 표시해야 한다', () => {
    vi.mocked(useBookDetailQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useBookDetailQuery>)
    vi.mocked(useBookActions).mockReturnValue({
      rentBook: vi.fn(),
      returnBook: vi.fn(),
      isActionPending: false,
    } as ReturnType<typeof useBookActions>)

    render(<BookDetailContainer id={mockId} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('데이터 로드 성공 시 도서 상세 정보를 표시해야 한다', () => {
    const mockBook = {
      id: 'book-1',
      title: 'Clean Code',
      statusLabel: '현재 대여 가능',
      actionButtonText: '대여하기' as const,
      canRent: true,
      canReturn: false,
    }

    vi.mocked(useBookDetailQuery).mockReturnValue({
      data: mockBook,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useBookDetailQuery>)
    vi.mocked(useBookActions).mockReturnValue({
      rentBook: vi.fn(),
      returnBook: vi.fn(),
      isActionPending: false,
    } as ReturnType<typeof useBookActions>)

    render(<BookDetailContainer id={mockId} />)
    expect(screen.getByText('Clean Code')).toBeInTheDocument()
    expect(screen.getByText('현재 대여 가능')).toBeInTheDocument()
    expect(screen.getByText('대여하기')).toBeInTheDocument()
  })

  it('대여 버튼 클릭 시 rentBook 함수를 호출해야 한다', () => {
    const mockRentBook = vi.fn()
    vi.mocked(useBookDetailQuery).mockReturnValue({
      data: {
        id: 'book-1',
        title: 'Clean Code',
        statusLabel: '현재 대여 가능',
        actionButtonText: '대여하기' as const,
        canRent: true,
        canReturn: false,
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useBookDetailQuery>)
    vi.mocked(useBookActions).mockReturnValue({
      rentBook: mockRentBook,
      returnBook: vi.fn(),
      isActionPending: false,
    } as ReturnType<typeof useBookActions>)

    render(<BookDetailContainer id={mockId} />)
    fireEvent.click(screen.getByText('대여하기'))
    expect(mockRentBook).toHaveBeenCalledWith('book-1')
  })

  it('반납 버튼 클릭 시 returnBook 함수를 호출해야 한다', () => {
    const mockReturnBook = vi.fn()
    vi.mocked(useBookDetailQuery).mockReturnValue({
      data: {
        id: 'book-1',
        title: 'Clean Code',
        statusLabel: '현재 대여 중',
        actionButtonText: '반납하기' as const,
        canRent: false,
        canReturn: true,
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useBookDetailQuery>)
    vi.mocked(useBookActions).mockReturnValue({
      rentBook: vi.fn(),
      returnBook: mockReturnBook,
      isActionPending: false,
    } as ReturnType<typeof useBookActions>)

    render(<BookDetailContainer id={mockId} />)
    fireEvent.click(screen.getByText('반납하기'))
    expect(mockReturnBook).toHaveBeenCalledWith('book-1')
  })

  it('뒤로 가기 버튼 클릭 시 useNavigate(-1)을 호출해야 한다', () => {
    vi.mocked(useBookDetailQuery).mockReturnValue({
      data: {
        id: 'book-1',
        title: 'Clean Code',
        statusLabel: '현재 대여 가능',
        actionButtonText: '대여하기' as const,
        canRent: true,
        canReturn: false,
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useBookDetailQuery>)
    vi.mocked(useBookActions).mockReturnValue({
      rentBook: vi.fn(),
      returnBook: vi.fn(),
      isActionPending: false,
    } as ReturnType<typeof useBookActions>)

    render(<BookDetailContainer id={mockId} />)
    fireEvent.click(screen.getByText('← 뒤로 가기'))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
