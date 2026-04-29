import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('자식 요소를 올바르게 렌더링해야 한다', () => {
    // Arrange
    render(<Badge>New</Badge>);

    // Assert
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('variant에 따라 올바른 클래스가 적용되어야 한다', () => {
    // Arrange
    const { rerender } = render(<Badge variant="success">Available</Badge>);
    expect(screen.getByText('Available')).toHaveClass('bg-success');

    rerender(<Badge variant="danger">Rented</Badge>);
    expect(screen.getByText('Rented')).toHaveClass('bg-danger');
  });
});
