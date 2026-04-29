import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { BookDetailPage } from './BookDetailPage'

// Mock features that might not exist yet or we want to isolate
vi.mock('../../features/BookDetail', () => ({
  BookDetailContainer: ({ id }: { id: string }) => <div data-testid="book-detail-container">Book ID: {id}</div>,
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    ScrollRestoration: () => <div data-testid="scroll-restoration" />,
  }
})

describe('BookDetailPage', () => {
  it('renders BookDetailContainer with id from URL', () => {
    render(
      <MemoryRouter initialEntries={['/books/123']}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByTestId('book-detail-container')).toHaveTextContent('Book ID: 123')
  })

  it('renders page sections', () => {
    render(
      <MemoryRouter initialEntries={['/books/123']}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('관리 기능')).toBeInTheDocument()
    expect(screen.getByText('대여 이력')).toBeInTheDocument()
  })
})
