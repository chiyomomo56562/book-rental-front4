import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UseMutationResult } from '@tanstack/react-query';
import { BookManagementContainer } from './BookManagementContainer';
import { useRenameBook } from '../useRenameBook';
import { useRemoveBook } from '../useRemoveBook';

vi.mock('../useRenameBook');
vi.mock('../useRemoveBook');

describe('BookManagementContainer', () => {
  const mockProps = {
    bookId: 'book-1',
    initialTitle: 'Original Title',
  };

  const mockRenameMutate = vi.fn();
  const mockRemoveMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRenameBook).mockReturnValue({
      mutate: mockRenameMutate,
      isPending: false,
    } as unknown as UseMutationResult<unknown, Error, unknown, unknown>);
    vi.mocked(useRemoveBook).mockReturnValue({
      mutate: mockRemoveMutate,
      isPending: false,
    } as unknown as UseMutationResult<unknown, Error, unknown, unknown>);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('수정 버튼 클릭 시 모달이 열려야 한다', () => {
    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('수정'));
    expect(screen.getByDisplayValue('Original Title')).toBeInTheDocument();
  });

  it('수정 모달에서 취소 버튼 클릭 시 모달이 닫혀야 한다', () => {
    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('수정'));
    fireEvent.click(screen.getByText('취소'));
    expect(screen.queryByDisplayValue('Original Title')).not.toBeInTheDocument();
  });

  it('제목 수정 요청이 성공하면 모달이 닫혀야 한다', async () => {
    vi.mocked(useRenameBook).mockReturnValue({
      mutate: (_data: unknown, options: { onSuccess: () => void; onError: (error: Error) => void }) => options.onSuccess(),
      isPending: false,
    } as unknown as UseMutationResult<unknown, Error, unknown, unknown>);

    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('수정'));
    fireEvent.change(screen.getByDisplayValue('Original Title'), { target: { value: 'New Title' } });
    fireEvent.click(screen.getByText('저장'));

    expect(screen.queryByDisplayValue('New Title')).not.toBeInTheDocument();
  });

  it('기존과 동일한 제목으로 수정 시도 시 API를 호출하지 않아야 한다', () => {
    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('수정'));
    fireEvent.click(screen.getByText('저장'));

    expect(mockRenameMutate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('변경사항이 없습니다.');
  });

  it('삭제 버튼 클릭 시 confirm 확인 후 삭제 API를 호출해야 한다', () => {
    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('삭제'));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockRemoveMutate).toHaveBeenCalled();
  });

  it('삭제 확인창에서 취소 시 API를 호출하지 않아야 한다', () => {
    vi.mocked(window.confirm).mockReturnValue(false);
    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('삭제'));
    
    expect(mockRemoveMutate).not.toHaveBeenCalled();
  });

  it('수정 실패 시 에러 알림을 표시해야 한다', async () => {
    const error = new Error('수정 실패');
    vi.mocked(useRenameBook).mockReturnValue({
      mutate: (_data: unknown, options: { onSuccess: () => void; onError: (error: Error) => void }) => options.onError(error),
      isPending: false,
    } as unknown as UseMutationResult<unknown, Error, unknown, unknown>);

    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('수정'));
    fireEvent.change(screen.getByDisplayValue('Original Title'), { target: { value: 'New Title' } });
    fireEvent.click(screen.getByText('저장'));

    expect(window.alert).toHaveBeenCalledWith('수정 실패');
  });

  it('삭제 실패 시 에러 알림을 표시해야 한다', async () => {
    const error = new Error('삭제 실패');
    vi.mocked(useRemoveBook).mockReturnValue({
      mutate: (_data: unknown, options: { onSuccess: () => void; onError: (error: Error) => void }) => options.onError(error),
      isPending: false,
    } as unknown as UseMutationResult<unknown, Error, unknown, unknown>);

    render(<BookManagementContainer {...mockProps} />);
    fireEvent.click(screen.getByText('삭제'));

    expect(window.alert).toHaveBeenCalledWith('삭제 실패');
  });
});
