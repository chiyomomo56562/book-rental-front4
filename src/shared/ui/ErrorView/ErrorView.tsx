import { Button } from '../Button'

interface ErrorViewProps {
  message?: string
  onRetry?: () => void
}

export const ErrorView = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  onRetry,
}: ErrorViewProps) => {
  return (
    <div className="rounded-lg bg-red-50 p-6 text-center">
      <p className="mb-4 text-red-600">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  )
}
