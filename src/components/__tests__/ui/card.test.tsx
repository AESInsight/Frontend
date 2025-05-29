import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../../ui/card';

describe('Card', () => {
  it('renders a complete card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('card-description')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('card-action')).toHaveTextContent('Action');
    expect(screen.getByTestId('card-content')).toHaveTextContent('Test Content');
    expect(screen.getByTestId('card-footer')).toHaveTextContent('Test Footer');
  });

  it('applies custom className to card', () => {
    const customClass = 'custom-class';
    render(<Card className={customClass} />);
    expect(screen.getByTestId('card')).toHaveClass(customClass);
  });

  it('renders card with only required components', () => {
    render(
      <Card>
        <CardContent>Minimal Content</CardContent>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toHaveTextContent('Minimal Content');
    expect(screen.queryByTestId('card-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-footer')).not.toBeInTheDocument();
  });
}); 