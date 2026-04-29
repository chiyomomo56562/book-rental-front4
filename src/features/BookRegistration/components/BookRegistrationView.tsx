import { useForm } from 'react-hook-form';
import { RegistrationFormValues } from '../types';
import { Button, TextField, Card, CardHeader, CardTitle, CardContent, ErrorView } from '../../../shared/ui';
import { requiredString } from '../../../shared/lib/validation';

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
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>도서 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            id="title"
            label="제목"
            placeholder="도서 제목을 입력하세요"
            error={errors.title?.message}
            {...register('title', requiredString('제목을 입력해주세요.'))}
          />

          {isError && (
            <ErrorView message="도서 등록 중 오류가 발생했습니다. 다시 시도해주세요." />
          )}

          <Button type="submit" isLoading={isLoading} className="w-full">
            등록
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
