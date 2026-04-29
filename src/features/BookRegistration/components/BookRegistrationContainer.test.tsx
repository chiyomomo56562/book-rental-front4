import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookRegistrationContainer } from './BookRegistrationContainer';
import { useRegisterBookMutation } from '../useRegisterBookMutation';

// useRegisterBookMutation 모킹
vi.mock('../useRegisterBookMutation');

describe('BookRegistrationContainer', () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRegisterBookMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
    } as any);
  });

  it('도서 등록 폼을 렌더링해야 한다', () => {
    render(<BookRegistrationContainer />);
    
    expect(screen.getByLabelText(/제목/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /등록/i })).toBeInTheDocument();
  });

  it('폼 제출 시 mutate 함수를 호출해야 한다', async () => {
    render(<BookRegistrationContainer />);

    const titleInput = screen.getByLabelText(/제목/i);
    const submitButton = screen.getByRole('button', { name: /등록/i });

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ title: 'Test Book' });
    });
  });

  it('등록 중일 때 버튼이 비활성화되어야 한다', () => {
    vi.mocked(useRegisterBookMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isError: false,
    } as any);

    render(<BookRegistrationContainer />);

    const submitButton = screen.getByRole('button', { name: /등록/i });
    expect(submitButton).toBeDisabled();
  });
});
