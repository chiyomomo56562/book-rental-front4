import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TextField } from './TextField'

describe('TextField', () => {
  it('label이 제공되면 올바르게 렌더링해야 한다', () => {
    // Arrange
    render(<TextField label="Username" id="username" />)

    // Assert
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
  })

  it('error가 제공되면 에러 메시지를 표시해야 한다', () => {
    // Arrange
    render(<TextField error="Required field" />)

    // Assert
    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Required field')
  })

  it('input의 props가 올바르게 전달되어야 한다', () => {
    // Arrange
    render(<TextField placeholder="Enter text" />)

    // Assert
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('error가 있을 때 border 색상이 danger로 변경되어야 한다', () => {
    // Arrange
    render(<TextField error="Error occurred" />)

    // Assert
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-danger')
  })
})
