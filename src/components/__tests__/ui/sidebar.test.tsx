import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../ui/sidebar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSidebar = () => {
    return render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  };

  it('renders in collapsed state initially', () => {
    renderSidebar();
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('w-16');
  });

  it('expands on mouse enter and collapses on mouse leave', () => {
    renderSidebar();
    const sidebar = screen.getByTestId('sidebar');
    fireEvent.mouseEnter(sidebar);
    expect(sidebar).toHaveClass('w-64');
    fireEvent.mouseLeave(sidebar);
    expect(sidebar).toHaveClass('w-16');
  });

  it('navigates to /about when About button is clicked', () => {
    renderSidebar();
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  it('navigates to /contact when Contact button is clicked', () => {
    renderSidebar();
    const contactButton = screen.getByText('Contact');
    fireEvent.click(contactButton);
    expect(mockNavigate).toHaveBeenCalledWith('/contact');
  });
}); 