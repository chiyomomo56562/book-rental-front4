import { useForm } from 'react-hook-form';
import { RegistrationFormValues } from '../types';
import { Button } from '../../../shared/ui';

interface Props {
  onSubmit: (values: RegistrationFormValues) => void;
  isLoading: boolean;
  isError: boolean;
}

export const BookRegistrationView = ({ onSubmit, isLoading, isError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      title: '',
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">도서 등록</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            id="title"
            type="text"
            {...register('title', {
              required: '제목을 입력해주세요.',
              validate: (value) => value.trim().length > 0 || '제목을 입력해주세요.',
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.title ? 'border-danger' : 'border-gray-300'
            }`}
            placeholder="도서 제목을 입력하세요"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-danger">{errors.title.message}</p>
          )}
        </div>

        {isError && (
          <p className="text-sm text-danger" role="alert">
            도서 등록 중 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        )}

        <Button type="submit" isLoading={isLoading} className="w-full">
          등록
        </Button>
      </form>
    </div>
  );
};
