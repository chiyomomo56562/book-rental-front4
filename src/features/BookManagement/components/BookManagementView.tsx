import React from 'react';
import { Button, TextField, Modal } from '@/shared/ui';

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

      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="도서 제목 수정">
        <form onSubmit={onSubmitRename}>
          <div className="mb-6">
            <TextField
              label="새 제목"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
              placeholder="변경할 도서 제목을 입력하세요"

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
      </Modal>
    </div>
  );
};
