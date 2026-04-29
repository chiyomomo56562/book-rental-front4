import { RentalHistoryViewModel } from '../types';
import { EmptyView, Spinner, Table, THead, TBody, TR, TH, TD, ErrorView } from '@/shared/ui';

interface Props {
  history: RentalHistoryViewModel[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

export const RentalHistoryView = ({ history, isLoading, isError, onRetry }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorView message="대여 이력을 불러오는 중 오류가 발생했습니다." onRetry={onRetry} />;
  }

  if (history.length === 0) {
    return <EmptyView message="대여 이력이 없습니다." />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold mb-4">대여 이력</h3>
      <Table>
        <THead>
          <TR>
            <TH>대여 일시</TH>
            <TH>반납 일시</TH>
          </TR>
        </THead>
        <TBody>
          {history.map((item) => (
            <TR key={item.id}>
              <TD>{item.rentedDateText}</TD>
              <TD className={item.isCurrentlyRented ? 'text-blue-600 font-bold' : ''}>
                {item.returnedDateText}
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
};
