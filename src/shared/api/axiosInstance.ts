import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ApiResponse, ApiError } from '../types/api'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: AxiosResponse<ApiResponse<any>>) => {
    // API_RULE: Return only the pure data (res.data.data)
    // If the response structure follows ApiResponse, return res.data.data
    if (response.data && Object.prototype.hasOwnProperty.call(response.data, 'data')) {
      return response.data.data
    }
    return response.data
  },
  (error) => {
    // API_RULE: Normalize backend error messages to ApiError specification and throw
    const apiError: ApiError = {
      message: error.response?.data?.error?.message || error.message || 'Unknown Error',
      code: error.response?.data?.error?.code || 'UNKNOWN_ERROR',
      status: error.response?.status || 500,
    }
    return Promise.reject(apiError)
  },
)
