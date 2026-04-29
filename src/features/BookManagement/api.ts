import { axiosInstance } from '../../shared/api/axiosInstance';
import { RenameBookTitleRequest } from './types';

export const renameBookTitle = (id: string, request: RenameBookTitleRequest) =>
  axiosInstance.patch(`/books/${id}/title`, request);

export const deleteBook = (id: string) =>
  axiosInstance.delete(`/books/${id}`);
