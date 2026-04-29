export type ApiError = {
  message: string;
  code: string;
  status: number;
};

export type ApiResponse<T> = {
  status: number;
  data: T;
  error: ApiError | null;
};
