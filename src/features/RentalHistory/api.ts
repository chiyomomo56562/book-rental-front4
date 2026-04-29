import { axiosInstance } from '@/shared/api/axiosInstance';
import { RawRentalHistory } from './types';
import { ApiResponse } from '@/shared/types/api';

export const getRentalHistory = async (bookId: string) => {
  const { data } = await axiosInstance.get<ApiResponse<RawRentalHistory[]>>(`/books/${bookId}/rentals`);
  return data;
};
