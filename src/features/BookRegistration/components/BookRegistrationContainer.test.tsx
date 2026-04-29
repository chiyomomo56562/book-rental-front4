import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BookRegistrationContainer } from './BookRegistrationContainer';
import { useRegisterBookMutation } from '../hooks/useRegisterBookMutation';

// useRegisterBookMutation 모킹
vi.mock('../useRegisterBookMutation');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('BookRegistrationContainer', () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRegisterBookMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
    } as unknown as ReturnType<typeof useRegisterBookMutation>);
  });

  it('도서 등록 폼을 렌더링해야 한다', () => {
    render(
      <MemoryRouter>
        <BookRegistrationContainer />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/제목/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /등록/i })).toBeInTheDocument();
  });

  it('폼 제출 시 mutate 함수를 호출해야 한다', async () => {
    render(
      <MemoryRouter>
        <BookRegistrationContainer />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/제목/i);
    const submitButton = screen.getByRole('button', { name: /등록/i });

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { title: 'Test Book' },
        expect.any(Object)
      );
    });
  });

  it('등록 성공 시 목록 페이지로 이동해야 한다', async () => {
    mockMutate.mockImplementation((_data, options) => {
      options.onSuccess();
    });

    render(
      <MemoryRouter>
        <BookRegistrationContainer />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/제목/i);
    const submitButton = screen.getByRole('button', { name: /등록/i });

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('등록 중일 때 버튼이 비활성화되어야 한다', () => {
    vi.mocked(useRegisterBookMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isError: false,
    } as unknown as ReturnType<typeof useRegisterBookMutation>);

    render(
      <MemoryRouter>
        <BookRegistrationContainer />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /등록/i });
    expect(submitButton).toBeDisabled();
  });
});
