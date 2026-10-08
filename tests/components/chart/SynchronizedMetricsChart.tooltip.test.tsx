import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { SynchronizedChartTooltip } from '../../../src/components/chart/SynchronizedMetricsChart/SynchronizedMetricsChart.tooltip';

afterEach(() => {
  cleanup();
});

const TOTAL_KEY = '__total__';
const TREND_KEY = '__trend__';

interface Entry {
  dataKey: string;
  name: string;
  value: number;
  color: string;
}

/** Brands named by rank, so `Brand 1` has the highest value. Shuffled so the tooltip has to rank them. */
function brandEntries(count: number): Entry[] {
  const entries = Array.from({ length: count }, (_, i) => ({
    dataKey: `brand-${i + 1}`,
    name: `Brand ${i + 1}`,
    value: (count - i) * 10,
    color: '#123456',
  }));
  return [
    ...entries.filter((_, i) => i % 2),
    ...entries.filter((_, i) => !(i % 2)),
  ];
}

function renderTooltip(payload: Entry[], trendSlope?: number): void {
  render(
    <SynchronizedChartTooltip
      timezone='UTC'
      totalDataKey={TOTAL_KEY}
      trendDataKey={TREND_KEY}
      trendSlope={trendSlope}
      trendUnit='count'
      valueFormatter={(value) => String(value)}
      active
      payload={payload}
      label={Date.UTC(2026, 8, 18)}
    />,
  );
}

function brandGrid(): HTMLElement {
  const grid = screen.getByText('Brand 1').closest('div')?.parentElement;
  if (!grid) throw new Error('brand grid not found');
  return grid;
}

/**
 * Reads the brand names column by column, as the grid places them: with a fixed row count and
 * column auto-flow, the nth row lands in column floor(n / rows).
 */
function columnsOf(grid: HTMLElement): string[][] {
  const style = getComputedStyle(grid);
  expect(style.gridAutoFlow).toBe('column');
  const columnCount = Number(
    /^repeat\((\d+),/.exec(style.gridTemplateColumns)?.[1],
  );
  const rowCount = Number(/^repeat\((\d+),/.exec(style.gridTemplateRows)?.[1]);

  const names = Array.from(grid.children).map(
    (row) => row.firstElementChild?.textContent ?? '',
  );
  const columns: string[][] = Array.from({ length: columnCount }, () => []);
  names.forEach((name, index) => {
    columns[Math.floor(index / rowCount)].push(name);
  });
  return columns;
}

function brandNames(from: number, to: number): string[] {
  return Array.from({ length: to - from + 1 }, (_, i) => `Brand ${from + i}`);
}

describe('SynchronizedChartTooltip', () => {
  test('lays out 24 brands as three columns of eight, ranked top to bottom then left to right', () => {
    renderTooltip(brandEntries(24));

    expect(columnsOf(brandGrid())).toEqual([
      brandNames(1, 8),
      brandNames(9, 16),
      brandNames(17, 24),
    ]);
  });

  test('fills the earlier columns first when the brands do not divide evenly', () => {
    renderTooltip(brandEntries(17));

    expect(columnsOf(brandGrid())).toEqual([
      brandNames(1, 6),
      brandNames(7, 12),
      brandNames(13, 17),
    ]);
  });

  test('splits 9 brands into a column of five then a column of four', () => {
    renderTooltip(brandEntries(9));

    expect(columnsOf(brandGrid())).toEqual([
      brandNames(1, 5),
      brandNames(6, 9),
    ]);
  });

  test('keeps 8 brands in a single column, highest first', () => {
    renderTooltip(brandEntries(8));

    expect(columnsOf(brandGrid())).toEqual([brandNames(1, 8)]);
  });

  test('shows the top 24 brands in column order and counts the rest', () => {
    renderTooltip(brandEntries(30));

    expect(columnsOf(brandGrid())).toEqual([
      brandNames(1, 8),
      brandNames(9, 16),
      brandNames(17, 24),
    ]);
    expect(screen.queryByText('Brand 25')).toBeNull();
    expect(screen.getByText('+ 6 more')).toBeTruthy();
  });

  test('keeps the total above the columns and the trend below them', () => {
    renderTooltip(
      [
        { dataKey: TOTAL_KEY, name: 'Total', value: 1000, color: '#000000' },
        {
          dataKey: TREND_KEY,
          name: 'Trend line',
          value: 500,
          color: '#000000',
        },
        ...brandEntries(12),
      ],
      2,
    );

    const grid = brandGrid();
    expect(columnsOf(grid)).toEqual([brandNames(1, 6), brandNames(7, 12)]);
    expect(grid.contains(screen.getByText('Total'))).toBe(false);
    expect(
      screen.getByText('Total').compareDocumentPosition(grid) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      grid.compareDocumentPosition(screen.getByText('Trend')) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.queryByText('Trend line')).toBeNull();
  });
});
