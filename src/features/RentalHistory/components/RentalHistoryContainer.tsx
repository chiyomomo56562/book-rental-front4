import { useRentalHistoryQuery } from '../hooks/useRentalHistoryQuery';
import { RentalHistoryView } from './RentalHistoryView';

interface Props {
  bookId: string;
}

export const RentalHistoryContainer = ({ bookId }: Props) => {
  const { data: history = [], isLoading, isError, refetch } = useRentalHistoryQuery(bookId);

  return (
    <RentalHistoryView
      history={history}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
    />
  );
};
