import { useNavigate } from 'react-router-dom';
import { BookRegistrationView } from './BookRegistrationView';
import { useRegisterBookMutation } from '../useRegisterBookMutation';
import { RegistrationFormValues } from '../types';

export const BookRegistrationContainer = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useRegisterBookMutation();

  const handleSubmit = (values: RegistrationFormValues) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <BookRegistrationView
      onSubmit={handleSubmit}
      isLoading={isPending}
      isError={isError}
    />
  );
};
