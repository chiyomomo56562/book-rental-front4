interface EmptyViewProps {
  message?: string;
}

export const EmptyView = ({ 
  message = '데이터가 없습니다.' 
}: EmptyViewProps) => {
  return (
    <div className="col-span-full py-10 text-center text-gray-500">
      {message}
    </div>
  );
};
