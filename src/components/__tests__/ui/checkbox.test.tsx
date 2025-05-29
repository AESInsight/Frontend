import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../../ui/checkbox';

describe('Checkbox', () => {
  it('renders without a label', () => {
    render(<Checkbox />);
    expect(screen.getByTestId('checkbox-input')).toBeInTheDocument();
    expect(screen.queryByTestId('checkbox-label')).not.toBeInTheDocument();
  });

  it('renders with a label', () => {
    const label = 'Test Checkbox';
    render(<Checkbox label={label} />);
    expect(screen.getByTestId('checkbox-input')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-label')).toHaveTextContent(label);
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByTestId('checkbox-input');
    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
}); 