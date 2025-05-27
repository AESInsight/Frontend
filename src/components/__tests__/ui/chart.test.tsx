import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 300 },
];

const mockConfig = {
  value: {
    label: 'Value',
    color: '#000000',
  },
};

describe('Chart', () => {
  beforeEach(() => {
    // Setup ResizeObserver mock
    global.ResizeObserver = ResizeObserverMock;
  });

  it('renders chart container with data', () => {
    render(
      <ChartContainer config={mockConfig}>
        <LineChart data={mockData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" />
        </LineChart>
      </ChartContainer>
    );

    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
  });

  it('renders tooltip with correct content', () => {
    const mockPayload = [
      {
        name: 'value',
        value: 100,
        dataKey: 'value',
        payload: { name: 'Jan', value: 100 },
      },
    ];

    render(
      <ChartContainer config={mockConfig}>
        <ChartTooltipContent
          active={true}
          payload={mockPayload}
          config={mockConfig}
        />
      </ChartContainer>
    );

    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('applies theme configuration correctly', () => {
    const themeConfig = {
      value: {
        label: 'Value',
        theme: {
          light: '#000000',
          dark: '#ffffff',
        },
      },
    };

    render(
      <ChartContainer config={themeConfig}>
        <LineChart data={mockData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" />
        </LineChart>
      </ChartContainer>
    );

    const container = screen.getByTestId('chart-container');
    expect(container).toHaveAttribute('data-chart');
  });
}); 