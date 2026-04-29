import React from 'react';
import { RentalHistoryViewModel } from '../types';
import { EmptyView, Spinner } from '@/shared/ui';

interface Props {
  history: RentalHistoryViewModel[];
  isLoading: boolean;
  isError: boolean;
}

export const RentalHistoryView = ({ history, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center p-4">대여 이력을 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (history.length === 0) {
    return <EmptyView message="대여 이력이 없습니다." />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold mb-4">대여 이력</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 font-semibold">대여 일시</th>
              <th className="px-4 py-2 font-semibold">반납 일시</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="px-4 py-3">{item.rentedDateText}</td>
                <td className={`px-4 py-3 ${item.isCurrentlyRented ? 'text-blue-600 font-bold' : ''}`}>
                  {item.returnedDateText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
