import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BookRegistrationPage } from './BookRegistrationPage'
import { MemoryRouter } from 'react-router-dom'

// Mocking the feature component
vi.mock('../../features/BookRegistration', () => ({
  BookRegistrationContainer: () => (
    <div data-testid="book-registration-container">Book Registration Container</div>
  ),
}))

// Mocking DefaultLayout
vi.mock('../../shared/ui/layout/DefaultLayout', () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="default-layout">{children}</div>
  ),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('BookRegistrationPage', () => {
  it('페이지 타이틀 "새로운 도서 등록"이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <BookRegistrationPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('새로운 도서 등록')).toBeInTheDocument()
  })

  it('BookRegistrationContainer가 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <BookRegistrationPage />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('book-registration-container')).toBeInTheDocument()
  })

  it('DefaultLayout으로 감싸져 있어야 한다', () => {
    render(
      <MemoryRouter>
        <BookRegistrationPage />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('default-layout')).toBeInTheDocument()
  })

  it('취소 버튼 클릭 시 이전 페이지로 이동해야 한다', () => {
    render(
      <MemoryRouter>
        <BookRegistrationPage />
      </MemoryRouter>,
    )
    const cancelButton = screen.getByText('취소')
    fireEvent.click(cancelButton)
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
