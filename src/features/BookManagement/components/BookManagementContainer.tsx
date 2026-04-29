import React, { useState } from 'react';
import { BookManagementProps } from '../types';
import { useRenameBook } from '../useRenameBook';
import { useRemoveBook } from '../useRemoveBook';
import { BookManagementView } from './BookManagementView';

export const BookManagementContainer = ({ bookId, initialTitle }: BookManagementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);

  const { mutate: rename, isPending: isRenamePending } = useRenameBook(bookId);
  const { mutate: remove, isPending: isRemovePending } = useRemoveBook(bookId);

  const handleOpenModal = () => {
    setNewTitle(initialTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newTitle === initialTitle) {
      alert('변경사항이 없습니다.');
      return;
    }

    rename(
      { title: newTitle },
      {
        onSuccess: () => {
          handleCloseModal();
        },
        onError: (error: Error) => {
          alert(error.message || '수정에 실패했습니다.');
        },
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      remove(undefined, {
        onError: (error: Error) => {
          alert(error.message || '삭제에 실패했습니다.');
        },
      });
    }
  };

  return (
    <BookManagementView
      isModalOpen={isModalOpen}
      title={newTitle}
      onTitleChange={setNewTitle}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
      onSubmitRename={handleRename}
      onDelete={handleDelete}
      isPending={isRenamePending || isRemovePending}
    />
  );
};
