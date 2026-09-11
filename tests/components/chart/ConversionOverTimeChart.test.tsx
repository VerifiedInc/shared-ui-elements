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

import {
  ConversionOverTimeChart,
  normalizePercentData,
} from '../../../src/components/chart/ConversionOverTimeChart';

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

describe('normalizePercentData', () => {
  const series = [
    { key: 'A', dataKey: 'a', color: '#111' },
    { key: 'B', dataKey: 'b', color: '#222' },
  ];

  test("'max' basis divides by the largest series so the biggest reads 100%", () => {
    const result = normalizePercentData(
      [{ date: 1, a: 100, b: 84 }],
      series,
      'max',
    );
    expect(result[0].a).toBe(1);
    expect(result[0].b).toBeCloseTo(0.84, 5);
  });

  test("'sum' basis divides by the point total so shares sum to 100%", () => {
    const result = normalizePercentData(
      [{ date: 1, a: 1, b: 18 }],
      series,
      'sum',
    );
    expect(result[0].a).toBeCloseTo(1 / 19, 5);
    expect(result[0].b).toBeCloseTo(18 / 19, 5);
    expect(Number(result[0].a) + Number(result[0].b)).toBeCloseTo(1, 5);
  });

  test('zero denominator yields zeros (no division by zero)', () => {
    expect(
      normalizePercentData([{ date: 1, a: 0, b: 0 }], series, 'sum')[0],
    ).toEqual({
      date: 1,
      a: 0,
      b: 0,
    });
    expect(
      normalizePercentData([{ date: 1, a: 0, b: 0 }], series, 'max')[0],
    ).toEqual({
      date: 1,
      a: 0,
      b: 0,
    });
  });

  test('preserves the date key and normalizes every series per point', () => {
    const result = normalizePercentData(
      [
        { date: 10, a: 2, b: 2 },
        { date: 20, a: 3, b: 1 },
      ],
      series,
      'sum',
    );
    expect(result.map((r) => r.date)).toEqual([10, 20]);
    expect(result[0].a).toBeCloseTo(0.5, 5);
    expect(result[1].a).toBeCloseTo(0.75, 5);
  });
});

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

describe('ConversionOverTimeChart — toggleGroup', () => {
  const pressed = (name: RegExp): string | null =>
    screen.getByRole('button', { name }).getAttribute('aria-pressed');

  function GroupHarness({
    options,
    initial = null,
    onValue,
  }: {
    options: Array<{ key: string; label: string }>;
    initial?: string | null;
    onValue?: (value: string | null) => void;
  }): ReturnType<typeof ConversionOverTimeChart> {
    const [value, setValue] = useState<string | null>(initial);
    return (
      <ThemeProvider theme={testTheme}>
        <ConversionOverTimeChart
          chartData={[
            {
              brandUuid: 'b1',
              brandName: 'Brand 1',
              interval: [
                { date: '2026-01-10T12:00:00Z', a: 10 },
                { date: '2026-01-11T12:00:00Z', a: 12 },
              ],
            },
          ]}
          seriesConfig={[{ key: 'A', dataKey: 'a', color: '#111' }]}
          stackMode='none'
          isLoading={false}
          isSuccess={true}
          isFetching={false}
          filter={{ timezone: 'UTC' }}
          extraToggles={[
            { id: 'x', label: 'Extra', selected: false, onChange: () => {} },
          ]}
          toggleGroup={{
            value,
            options,
            onChange: (next) => {
              setValue(next);
              onValue?.(next);
            },
          }}
        />
      </ThemeProvider>
    );
  }

  const twoOptions = [
    { key: 'providers', label: 'Succeeded From' },
    { key: 'network', label: 'Network Status' },
  ];

  test('renders nothing for an undefined or empty group', () => {
    renderChart({
      toggleGroup: { value: null, options: [], onChange: () => {} },
    });
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('selecting one member deselects the other', () => {
    render(<GroupHarness options={twoOptions} initial='providers' />);
    fireEvent.click(screen.getByRole('button', { name: /network status/i }));
    expect(pressed(/network status/i)).toBe('true');
    expect(pressed(/succeeded from/i)).toBe('false');
  });

  test('clicking the selected member clears the selection', () => {
    const values: Array<string | null> = [];
    render(
      <GroupHarness
        options={twoOptions}
        initial='network'
        onValue={(v) => values.push(v)}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /network status/i }));
    expect(values).toEqual([null]);
    expect(pressed(/network status/i)).toBe('false');
    expect(pressed(/succeeded from/i)).toBe('false');
  });

  test('uses ariaLabel for a member when supplied, falling back to label', () => {
    renderChart({
      toggleGroup: {
        value: null,
        onChange: () => {},
        options: [
          {
            key: 'network',
            label: 'Network Status',
            ariaLabel: 'Break down by network status',
          },
          { key: 'providers', label: 'Succeeded From' },
        ],
      },
    });
    expect(
      screen.getByRole('button', { name: /break down by network status/i }),
    ).not.toBeNull();
    expect(
      screen.getByRole('button', { name: /succeeded from/i }),
    ).not.toBeNull();
  });

  test('a single-member group behaves as an on/off toggle', () => {
    render(<GroupHarness options={[twoOptions[1]]} />);
    const button = screen.getByRole('button', { name: /network status/i });
    fireEvent.click(button);
    expect(pressed(/network status/i)).toBe('true');
    fireEvent.click(button);
    expect(pressed(/network status/i)).toBe('false');
  });

  test('the group does not disturb the Numbers / Percentages selection', () => {
    render(<GroupHarness options={twoOptions} />);
    fireEvent.click(screen.getByRole('button', { name: /percentages/i }));
    fireEvent.click(screen.getByRole('button', { name: /network status/i }));
    fireEvent.click(screen.getByRole('button', { name: /network status/i }));
    expect(pressed(/percentages/i)).toBe('true');
  });

  test('sits between the auxiliary toggles and Numbers / Percentages, after Show Trend', () => {
    render(<GroupHarness options={twoOptions} />);
    const names = screen
      .getAllByRole('button')
      .map((button) => button.getAttribute('aria-label') ?? button.textContent);
    expect(names).toEqual([
      'Show trend line',
      'Extra',
      'Succeeded From',
      'Network Status',
      'Numbers',
      'Percentages',
    ]);
  });
});
