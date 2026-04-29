interface ErrorViewProps {
  message?: string
}

export const ErrorView = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
}: ErrorViewProps) => {
  return <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">{message}</div>
}
