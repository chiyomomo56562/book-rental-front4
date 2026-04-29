import { Spinner } from '../Spinner'

interface LoadingViewProps {
  size?: 'sm' | 'md' | 'lg'
  fullHeight?: boolean
}

export const LoadingView = ({ size = 'lg', fullHeight = false }: LoadingViewProps) => {
  const heightClass = fullHeight ? 'h-64' : 'h-40'

  return (
    <div className={`flex items-center justify-center ${heightClass}`}>
      <Spinner size={size} />
    </div>
  )
}
