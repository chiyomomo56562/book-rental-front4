import { axiosInstance } from '../../shared/api/axiosInstance';
import { RawBookDetail } from './types';

export const getBookById = (id: string): Promise<RawBookDetail> => {
  return axiosInstance.get(`/books/${id}`);
};
