import { axiosInstance } from '../../shared/api/axiosInstance'
import { RawBookDetail } from './types'

export const getBookById = (id: string): Promise<RawBookDetail> => {
  return axiosInstance.get(`/books/${id}`)
}

export const rentalBook = (id: string): Promise<boolean> => {
  return axiosInstance.post(`/books/${id}/rentals`)
}

export const returnBook = (id: string): Promise<boolean> => {
  return axiosInstance.patch(`/books/${id}/rentals/return`)
}
