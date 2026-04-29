import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('올바르게 렌더링되어야 한다', () => {
    // Arrange
    render(<Spinner />);

    // Assert
    expect(screen.getByLabelText('loading')).toBeInTheDocument();
  });

  it('size에 따라 올바른 클래스가 적용되어야 한다', () => {
    // Arrange
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByLabelText('loading')).toHaveClass('h-4');

    rerender(<Spinner size="lg" />);
    expect(screen.getByLabelText('loading')).toHaveClass('h-8');
  });
});
