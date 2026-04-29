import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookListPage } from './BookListPage';
import { MemoryRouter } from 'react-router-dom';

// Mocking the feature component
vi.mock('../../features/BookList', () => ({
  BookListContainer: ({ onBookClick }: { onBookClick: (id: number) => void }) => (
    <div data-testid="book-list-feature">
      Book List Feature
      <button onClick={() => onBookClick(123)}>Click Book 123</button>
    </div>
  ),
}));

// Mocking DefaultLayout
vi.mock('../../shared/ui/layout/DefaultLayout', () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="default-layout">{children}</div>
  ),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    ScrollRestoration: () => <div data-testid="scroll-restoration" />,
  };
});

describe('BookListPage', () => {
  it('페이지 타이틀 "도서 목록"이 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );
    expect(screen.getByText('도서 목록')).toBeInTheDocument();
  });

  it('BookList 피처 컴포넌트가 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('book-list-feature')).toBeInTheDocument();
  });

  it('DefaultLayout으로 감싸져 있어야 한다', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('default-layout')).toBeInTheDocument();
  });

  it('"도서 등록" 버튼 클릭 시 /books/register로 이동해야 한다', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );
    const registerButton = screen.getByText('도서 등록');
    fireEvent.click(registerButton);
    expect(mockNavigate).toHaveBeenCalledWith('/books/register');
  });

  it('뒤로 가기 시 스크롤 위치를 위해 ScrollRestoration 컴포넌트가 포함되어야 한다', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('scroll-restoration')).toBeInTheDocument();
  });

  it('도서 항목 클릭 시 /books/:id로 이동해야 한다', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );
    const bookItem = screen.getByText('Click Book 123');
    fireEvent.click(bookItem);
    expect(mockNavigate).toHaveBeenCalledWith('/books/123');
  });
});
