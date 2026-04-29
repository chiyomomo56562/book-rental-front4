import React from 'react';
import { useRentalHistoryQuery } from '../useRentalHistoryQuery';
import { RentalHistoryView } from './RentalHistoryView';

interface Props {
  bookId: string;
}

export const RentalHistoryContainer = ({ bookId }: Props) => {
  const { data: history = [], isLoading, isError } = useRentalHistoryQuery(bookId);

  return <RentalHistoryView history={history} isLoading={isLoading} isError={isError} />;
};
