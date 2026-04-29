import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookListPage } from './BookListPage';

// Mocking the feature component
vi.mock('../../features/BookList', () => ({
  BookListContainer: () => <div data-testid="book-list-feature">Book List Feature</div>,
}));

// Mocking DefaultLayout
vi.mock('../../shared/ui/layout/DefaultLayout', () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="default-layout">{children}</div>
  ),
}));

describe('BookListPage', () => {
  it('페이지 타이틀 "도서 목록"이 렌더링되어야 한다', () => {
    render(<BookListPage />);
    expect(screen.getByText('도서 목록')).toBeInTheDocument();
  });

  it('BookList 피처 컴포넌트가 렌더링되어야 한다', () => {
    render(<BookListPage />);
    expect(screen.getByTestId('book-list-feature')).toBeInTheDocument();
  });

  it('DefaultLayout으로 감싸져 있어야 한다', () => {
    render(<BookListPage />);
    expect(screen.getByTestId('default-layout')).toBeInTheDocument();
  });
});
