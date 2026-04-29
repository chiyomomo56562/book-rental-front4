import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('자식 요소를 올바르게 렌더링해야 한다', () => {
    // Arrange
    render(<Button>Click me</Button>)

    // Assert
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('클릭 시 onClick 핸들러가 호출되어야 한다', () => {
    // Arrange
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    // Act
    fireEvent.click(screen.getByText('Click me'))

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disabled 상태일 때 클릭 핸들러가 호출되지 않아야 한다', () => {
    // Arrange
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    )

    // Act
    fireEvent.click(screen.getByText('Click me'))

    // Assert
    expect(handleClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('isLoading 상태일 때 버튼이 비활성화되어야 한다', () => {
    // Arrange
    render(<Button isLoading>Click me</Button>)

    // Assert
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
