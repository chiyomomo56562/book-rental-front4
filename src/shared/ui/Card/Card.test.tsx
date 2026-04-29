import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('자식 요소를 올바르게 렌더링해야 한다', () => {
    // Arrange
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    // Assert
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('추가적인 className이 적용되어야 한다', () => {
    // Arrange
    render(<Card className="custom-card">Content</Card>);

    // Assert
    expect(screen.getByText('Content')).toHaveClass('custom-card');
  });
});
