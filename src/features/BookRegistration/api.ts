import { axiosInstance } from '../../shared/api/axiosInstance';
import { RawBook } from '../../shared/types/book';
import { CreateBookRequest } from './types';

export const registerBook = (params: CreateBookRequest): Promise<RawBook> => {
  return axiosInstance.post('/books', params);
};
