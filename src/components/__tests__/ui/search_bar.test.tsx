import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../ui/search_bar';

describe('SearchBar', () => {
  it('renders all elements correctly', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('updates search query when typing', () => {
    render(<SearchBar />);
    const input = screen.getByTestId('search-input');
    const searchQuery = 'test search';
    
    fireEvent.change(input, { target: { value: searchQuery } });
    expect(input).toHaveValue(searchQuery);
  });

  it('displays correct placeholder text', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Search for data...');
  });
}); 