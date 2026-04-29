import React from 'react';
import { Button } from '../../../shared/ui/Button';
import { TextField } from '../../../shared/ui/TextField';

interface Props {
  isModalOpen: boolean;
  title: string;
  onTitleChange: (value: string) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onSubmitRename: (e: React.FormEvent) => void;
  onDelete: () => void;
  isPending: boolean;
}

export const BookManagementView = ({
  isModalOpen,
  title,
  onTitleChange,
  onOpenModal,
  onCloseModal,
  onSubmitRename,
  onDelete,
  isPending,
}: Props) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onOpenModal}>
        수정
      </Button>
      <Button variant="danger" size="sm" onClick={onDelete}>
        삭제
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">도서 제목 수정</h2>
            <form onSubmit={onSubmitRename}>
              <div className="mb-6">
                <TextField
                  label="새 제목"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="도서 제목을 입력하세요"
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCloseModal}>
                  취소
                </Button>
                <Button type="submit" isLoading={isPending}>
                  저장
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
