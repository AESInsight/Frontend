import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactBubble from '../../ui/contact_bubble';

describe('ContactBubble', () => {
  const mockProps = {
    name: 'John Doe',
    phoneNumber: '+45 12345678',
    email: 'john@example.com',
    initials: 'JD'
  };

  it('renders with all required props', () => {
    render(<ContactBubble {...mockProps} />);
    
    // Check if name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if phone number is rendered
    expect(screen.getByText('+45 12345678')).toBeInTheDocument();
    
    // Check if email is rendered
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    // Check if profile image is rendered with correct src
    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/profilePic/JD.png');
  });

  it('applies correct CSS classes', () => {
    render(<ContactBubble {...mockProps} />);
    
    // Check if the main container has the correct classes
    const container = screen.getByText('John Doe').parentElement?.parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'bg-white', 'rounded-lg', 'shadow-lg');
    
    // Check if the profile image has the correct classes
    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toHaveClass('rounded-full', 'border-2', 'border-sky-600');
    
    // Check if the contact info container has the correct classes
    const contactInfo = screen.getByText('John Doe').parentElement;
    expect(contactInfo).toHaveClass('text-center');
  });

  it('renders with different props', () => {
    const differentProps = {
      name: 'Jane Smith',
      phoneNumber: '+45 87654321',
      email: 'jane@example.com',
      initials: 'JS'
    };
    
    render(<ContactBubble {...differentProps} />);
    
    // Check if new name is rendered
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check if new phone number is rendered
    expect(screen.getByText('+45 87654321')).toBeInTheDocument();
    
    // Check if new email is rendered
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    
    // Check if profile image is rendered with new initials
    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toHaveAttribute('src', '/profilePic/JS.png');
  });
}); 