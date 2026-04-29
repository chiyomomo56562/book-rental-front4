import { axiosInstance } from '../../shared/api/axiosInstance';
import { RawBook } from './types';

export const getBooks = (): Promise<RawBook[]> => {
  return axiosInstance.get('/books');
};
