import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../../ui/select';

describe('Select', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Choose an option';
  const placeholder = 'Pick...';
  let selected = '';
  let onChange: (value: string) => void;

  beforeEach(() => {
    selected = '';
    onChange = vi.fn((value) => {
      selected = value;
    });
  });

  it('renders with label and placeholder', () => {
    render(
      <Select
        options={options}
        selected={selected}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('opens and closes the dropdown', () => {
    render(
      <Select options={options} selected={selected} onChange={onChange} />
    );
    const toggle = screen.getByTestId('select-toggle');
    fireEvent.click(toggle);
    expect(screen.getByTestId('select-dropdown')).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByTestId('select-dropdown')).not.toBeInTheDocument();
  });

  it('renders all options when open', () => {
    render(
      <Select options={options} selected={selected} onChange={onChange} />
    );
    fireEvent.click(screen.getByTestId('select-toggle'));
    const optionElements = screen.getAllByTestId('select-option');
    expect(optionElements.length).toBe(options.length);
    options.forEach((option, idx) => {
      expect(optionElements[idx]).toHaveTextContent(option);
    });
  });

  it('calls onChange and closes dropdown when option is clicked', () => {
    render(
      <Select options={options} selected={selected} onChange={onChange} />
    );
    fireEvent.click(screen.getByTestId('select-toggle'));
    const optionElements = screen.getAllByTestId('select-option');
    fireEvent.click(optionElements[1]);
    expect(onChange).toHaveBeenCalledWith('Option 2');
    expect(screen.queryByTestId('select-dropdown')).not.toBeInTheDocument();
  });

  it('shows "No options available" when options is empty', () => {
    render(
      <Select options={[]} selected={selected} onChange={onChange} />
    );
    fireEvent.click(screen.getByTestId('select-toggle'));
    expect(screen.getByTestId('select-no-options')).toBeInTheDocument();
  });
}); 