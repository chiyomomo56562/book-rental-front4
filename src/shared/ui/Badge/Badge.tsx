import { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline'
  children: ReactNode
  className?: string
}

export const Badge = ({ variant = 'primary', children, className = '' }: BadgeProps) => {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    outline: 'border border-gray-300 text-gray-700',
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return <div className={combinedClassName}>{children}</div>
}
