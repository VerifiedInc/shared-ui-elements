import { afterEach, beforeAll, expect, test, describe } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
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
  SynchronizedMetricsChart,
  enrichWithTotal,
  mergeChartData,
  TOTAL_DATA_KEY,
} from '../../../src/components/chart/SynchronizedMetricsChart/SynchronizedMetricsChart';
import type { SubChartConfig } from '../../../src/components/chart/SynchronizedMetricsChart/SynchronizedMetricsChart.types';
import type { SeriesChartData } from '../../../src/components/chart/SeriesChart';

// Minimal theme — just enough to satisfy theme.palette.neutral access.
const testTheme = createTheme({
  palette: {
    // Registered in src/styles/theme.ts module augmentation; createTheme
    // accepts the augmented keys once the types are in scope.
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

function brand(
  uuid: string,
  name: string,
  color: string,
  points: Array<[number, number]>,
): SeriesChartData {
  return {
    uuid,
    name,
    color,
    brandUuid: uuid,
    brandName: name,
    chartData: points.map(([date, value]) => ({ date, value })),
  };
}

const DATE_A = Date.UTC(2026, 0, 10);
const DATE_B = Date.UTC(2026, 0, 11);
const DATE_C = Date.UTC(2026, 0, 12);

describe('mergeChartData', () => {
  test('merges brands into date-keyed entries sorted ascending', () => {
    const brands: SeriesChartData[] = [
      brand('brand-1', 'Brand 1', '#111', [
        [DATE_B, 10],
        [DATE_A, 5],
      ]),
      brand('brand-2', 'Brand 2', '#222', [
        [DATE_A, 3],
        [DATE_C, 7],
      ]),
    ];

    const merged = mergeChartData(brands);

    expect(merged).toHaveLength(3);
    expect(merged[0]).toEqual({ date: DATE_A, 'brand-1': 5, 'brand-2': 3 });
    expect(merged[1]).toEqual({ date: DATE_B, 'brand-1': 10 });
    expect(merged[2]).toEqual({ date: DATE_C, 'brand-2': 7 });
  });
});

describe('enrichWithTotal', () => {
  test('adds __total__ summed across visible brands per entry', () => {
    const merged: Array<Record<string, number>> = [
      { date: DATE_A, 'brand-1': 5, 'brand-2': 3 },
      { date: DATE_B, 'brand-1': 10 },
    ];

    const enriched = enrichWithTotal(merged, ['brand-1', 'brand-2']);

    expect(enriched[0][TOTAL_DATA_KEY]).toBe(8);
    // Missing brand key counts as 0 (not NaN).
    expect(enriched[1][TOTAL_DATA_KEY]).toBe(10);
  });

  test('only sums the brand keys passed in as visible', () => {
    const merged: Array<Record<string, number>> = [
      { date: DATE_A, 'brand-1': 5, 'brand-2': 3, 'brand-3': 11 },
    ];

    const enriched = enrichWithTotal(merged, ['brand-1', 'brand-3']);

    expect(enriched[0][TOTAL_DATA_KEY]).toBe(16);
  });

  test('is a no-op when visibleBrandKeys is empty (returns the same entries)', () => {
    const merged: Array<Record<string, number>> = [
      { date: DATE_A, 'brand-1': 5 },
    ];
    const enriched = enrichWithTotal(merged, []);

    expect(enriched).toBe(merged);
  });
});

const multiBrandAbsolute: SubChartConfig = {
  title: 'Started',
  isPercentage: false,
  data: [
    brand('brand-1', 'Brand 1', '#111', [
      [DATE_A, 5],
      [DATE_B, 10],
    ]),
    brand('brand-2', 'Brand 2', '#222', [
      [DATE_A, 3],
      [DATE_B, 7],
    ]),
  ],
};

const singleBrandAbsolute: SubChartConfig = {
  title: 'Started',
  isPercentage: false,
  data: [
    brand('brand-1', 'Brand 1', '#111', [
      [DATE_A, 5],
      [DATE_B, 10],
    ]),
  ],
};

const percentageSubChart: SubChartConfig = {
  title: 'Success %',
  isPercentage: true,
  data: [
    brand('brand-1', 'Brand 1', '#111', [
      [DATE_A, 95],
      [DATE_B, 90],
    ]),
    brand('brand-2', 'Brand 2', '#222', [
      [DATE_A, 80],
      [DATE_B, 85],
    ]),
  ],
};

function renderChart(
  subCharts: readonly [SubChartConfig, ...SubChartConfig[]],
) {
  return render(
    <ThemeProvider theme={testTheme}>
      <div style={{ width: 800, height: 600 }}>
        <SynchronizedMetricsChart
          subCharts={subCharts}
          isLoading={false}
          isSuccess={true}
          isFetching={false}
          filter={{ timezone: 'UTC', brands: [] }}
        />
      </div>
    </ThemeProvider>,
  );
}

describe('<SynchronizedMetricsChart/> controls gating', () => {
  test('renders both Show Total and Log Scale when absolute multi-brand present', () => {
    const { getByRole } = renderChart([multiBrandAbsolute]);
    expect(getByRole('button', { name: 'Show Total line' })).toBeDefined();
    expect(
      getByRole('button', { name: 'Toggle logarithmic scale' }),
    ).toBeDefined();
  });

  test('hides Show Total when only one brand is in the absolute sub-chart', () => {
    const { queryByRole, getByRole } = renderChart([singleBrandAbsolute]);
    expect(queryByRole('button', { name: 'Show Total line' })).toBeNull();
    // Log Scale is still available because an absolute sub-chart exists.
    expect(
      getByRole('button', { name: 'Toggle logarithmic scale' }),
    ).toBeDefined();
  });

  test('hides both controls when only percentage sub-charts exist', () => {
    const { queryByRole } = renderChart([percentageSubChart]);
    expect(queryByRole('button', { name: 'Show Total line' })).toBeNull();
    expect(
      queryByRole('button', { name: 'Toggle logarithmic scale' }),
    ).toBeNull();
  });

  test('renders only Show Total + Log Scale when mixing percentage and absolute multi-brand', () => {
    const { getByRole } = renderChart([percentageSubChart, multiBrandAbsolute]);
    expect(getByRole('button', { name: 'Show Total line' })).toBeDefined();
    expect(
      getByRole('button', { name: 'Toggle logarithmic scale' }),
    ).toBeDefined();
  });

  test('toggle aria-pressed flips on click', () => {
    const { getByRole } = renderChart([multiBrandAbsolute]);
    const total = getByRole('button', { name: 'Show Total line' });

    expect(total.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(total);
    expect(total.getAttribute('aria-pressed')).toBe('true');
  });
});
