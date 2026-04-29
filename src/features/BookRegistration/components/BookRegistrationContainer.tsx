import { BookRegistrationView } from './BookRegistrationView';
import { useRegisterBookMutation } from '../useRegisterBookMutation';
import { RegistrationFormValues } from '../types';

export const BookRegistrationContainer = () => {
  const { mutate, isPending, isError } = useRegisterBookMutation();

  const handleSubmit = (values: RegistrationFormValues) => {
    mutate(values);
  };

  return (
    <BookRegistrationView
      onSubmit={handleSubmit}
      isLoading={isPending}
      isError={isError}
    />
  );
};
