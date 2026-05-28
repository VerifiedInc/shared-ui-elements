import { useState } from 'react';
import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material';

// Recharts' ResponsiveContainer uses ResizeObserver, which jsdom doesn't provide.
beforeAll(() => {
  class MockResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  (
    globalThis as unknown as { ResizeObserver: typeof MockResizeObserver }
  ).ResizeObserver = MockResizeObserver;
});

import { ConversionOverTimeChart } from '../../../src/components/chart/ConversionOverTimeChart';

const testTheme = createTheme({
  palette: {
    neutral: { main: '#999999' },
    neutralContrast: { main: '#cccccc' },
    warningContrast: { main: '#ff9800' },
    infoContrast: { main: '#2196f3' },
    dangerContrast: { main: '#f44336' },
  },
});

afterEach(() => {
  cleanup();
});

function renderChart(
  props: Record<string, unknown> = {},
): ReturnType<typeof render> {
  const defaultProps = {
    chartData: [
      {
        brandUuid: 'b1',
        brandName: 'Brand 1',
        interval: [
          { date: '2026-01-10T12:00:00Z', a: 10, b: 5 },
          { date: '2026-01-11T12:00:00Z', a: 12, b: 7 },
        ],
      },
    ],
    seriesConfig: [
      { key: 'A', dataKey: 'a', color: '#111' },
      { key: 'B', dataKey: 'b', color: '#222' },
    ],
    isLoading: false,
    isSuccess: true,
    isFetching: false,
    filter: { timezone: 'UTC' },
  };
  return render(
    <ThemeProvider theme={testTheme}>
      <ConversionOverTimeChart {...defaultProps} {...props} />
    </ThemeProvider>,
  );
}

describe('ConversionOverTimeChart — extraToggles', () => {
  test('renders no extra toggles when prop is undefined', () => {
    renderChart();
    expect(screen.queryByRole('button', { name: /variant a/i })).toBeNull();
  });

  test('renders no extra toggles when prop is an empty array', () => {
    renderChart({ extraToggles: [] });
    expect(screen.queryByRole('button', { name: /variant a/i })).toBeNull();
  });

  test('renders one toggle button per entry', () => {
    renderChart({
      extraToggles: [
        { id: 'a', label: 'Variant A', selected: false, onChange: () => {} },
        { id: 'b', label: 'Variant B', selected: true, onChange: () => {} },
      ],
    });
    expect(screen.getByRole('button', { name: /variant a/i })).not.toBeNull();
    expect(screen.getByRole('button', { name: /variant b/i })).not.toBeNull();
  });

  test('reflects the `selected` prop on each toggle via aria-pressed', () => {
    renderChart({
      extraToggles: [
        { id: 'a', label: 'Variant A', selected: false, onChange: () => {} },
        { id: 'b', label: 'Variant B', selected: true, onChange: () => {} },
      ],
    });
    expect(
      screen
        .getByRole('button', { name: /variant a/i })
        .getAttribute('aria-pressed'),
    ).toBe('false');
    expect(
      screen
        .getByRole('button', { name: /variant b/i })
        .getAttribute('aria-pressed'),
    ).toBe('true');
  });

  test('clicking a toggle invokes onChange with the flipped selected value', () => {
    const calls: boolean[] = [];
    renderChart({
      extraToggles: [
        {
          id: 'a',
          label: 'Variant A',
          selected: false,
          onChange: (value: boolean) => calls.push(value),
        },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: /variant a/i }));
    expect(calls).toEqual([true]);
  });

  test('uses ariaLabel when supplied, falling back to label otherwise', () => {
    renderChart({
      extraToggles: [
        {
          id: 'a',
          label: 'Variant A',
          ariaLabel: 'Show Variant A series',
          selected: false,
          onChange: () => {},
        },
        { id: 'b', label: 'Variant B', selected: false, onChange: () => {} },
      ],
    });
    expect(
      screen.getByRole('button', { name: /show variant a series/i }),
    ).not.toBeNull();
    expect(screen.getByRole('button', { name: /variant b/i })).not.toBeNull();
  });

  test('Numbers / Percentages toggle group still renders alongside extra toggles', () => {
    renderChart({
      extraToggles: [
        { id: 'a', label: 'Variant A', selected: false, onChange: () => {} },
      ],
    });
    expect(screen.getByRole('button', { name: /numbers/i })).not.toBeNull();
    expect(screen.getByRole('button', { name: /percentages/i })).not.toBeNull();
  });

  test('Numbers / Percentages still drives view switching when extra toggles are present', () => {
    function Harness(): ReturnType<typeof ConversionOverTimeChart> {
      const [extraOn, setExtraOn] = useState(false);
      return (
        <ThemeProvider theme={testTheme}>
          <ConversionOverTimeChart
            chartData={[
              {
                brandUuid: 'b1',
                brandName: 'Brand 1',
                interval: [{ date: '2026-01-10T12:00:00Z', a: 10 }],
              },
            ]}
            seriesConfig={[{ key: 'A', dataKey: 'a', color: '#111' }]}
            isLoading={false}
            isSuccess={true}
            isFetching={false}
            filter={{ timezone: 'UTC' }}
            extraToggles={[
              {
                id: 'x',
                label: 'Variant A',
                selected: extraOn,
                onChange: setExtraOn,
              },
            ]}
          />
        </ThemeProvider>
      );
    }
    render(<Harness />);
    const percentages = screen.getByRole('button', { name: /percentages/i });
    fireEvent.click(percentages);
    // After clicking Percentages, that view becomes selected (aria-pressed=true).
    expect(percentages.getAttribute('aria-pressed')).toBe('true');
  });
});
