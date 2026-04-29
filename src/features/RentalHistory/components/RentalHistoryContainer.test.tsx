import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RentalHistoryContainer } from './RentalHistoryContainer';
import * as hooks from '../useRentalHistoryQuery';

vi.mock('../useRentalHistoryQuery');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('RentalHistoryContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    vi.mocked(hooks.useRentalHistoryQuery).mockReturnValue({
      isLoading: true,
      data: [],
      isError: false,
    } as any);

    render(<RentalHistoryContainer bookId="1" />, { wrapper });

    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner uses role="status"
  });

  it('should render empty state', () => {
    vi.mocked(hooks.useRentalHistoryQuery).mockReturnValue({
      isLoading: false,
      data: [],
      isError: false,
      isSuccess: true,
    } as any);

    render(<RentalHistoryContainer bookId="1" />, { wrapper });

    expect(screen.getByText('대여 이력이 없습니다.')).toBeInTheDocument();
  });

  it('should render history list', () => {
    vi.mocked(hooks.useRentalHistoryQuery).mockReturnValue({
      isLoading: false,
      data: [
        {
          id: '1',
          rentedDateText: '2024.04.27 19:00',
          returnedDateText: '2024.04.28 00:00',
          isCurrentlyRented: false,
          rentedAt: '2024-04-27T10:00:00Z',
        },
        {
          id: '2',
          rentedDateText: '2024.04.28 18:00',
          returnedDateText: '대여 중',
          isCurrentlyRented: true,
          rentedAt: '2024-04-28T09:00:00Z',
        },
      ],
      isError: false,
      isSuccess: true,
    } as any);

    render(<RentalHistoryContainer bookId="1" />, { wrapper });

    expect(screen.getByText('2024.04.27 19:00')).toBeInTheDocument();
    expect(screen.getByText('2024.04.28 18:00')).toBeInTheDocument();
    expect(screen.getByText('대여 중')).toBeInTheDocument();
  });

  it('should render error state', () => {
    vi.mocked(hooks.useRentalHistoryQuery).mockReturnValue({
      isLoading: false,
      data: [],
      isError: true,
    } as any);

    render(<RentalHistoryContainer bookId="1" />, { wrapper });

    expect(screen.getByText('대여 이력을 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
  });
});
