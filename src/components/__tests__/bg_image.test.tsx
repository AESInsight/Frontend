import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BgImage from '../bg_image';

describe('BgImage', () => {
  it('renders with default props', () => {
    render(<BgImage />);
    
    const image = screen.getByRole('img', { name: 'Background' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/bgimage.png');
    expect(image).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full', 'object-cover');
  });

  it('renders with custom className', () => {
    const customClass = 'custom-class';
    render(<BgImage className={customClass} />);
    
    const image = screen.getByRole('img', { name: 'Background' });
    expect(image).toHaveClass(customClass);
  });

  it('maintains all required classes when custom className is provided', () => {
    const customClass = 'custom-class';
    render(<BgImage className={customClass} />);
    
    const image = screen.getByRole('img', { name: 'Background' });
    expect(image).toHaveClass(
      'absolute',
      'inset-0',
      'w-full',
      'h-full',
      'object-cover',
      customClass
    );
  });
}); 