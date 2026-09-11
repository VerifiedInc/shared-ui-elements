import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';

// BigNumber animates its text through framer-motion; jump straight to the end value.
vi.mock(import('framer-motion'), async (importOriginal) => ({
  ...(await importOriginal()),
  animate: ((
    _from: number,
    to: number,
    options: { onUpdate: (value: number) => void },
  ) => {
    options.onUpdate(to);
    return { stop(): void {} };
  }) as unknown as typeof import('framer-motion').animate,
}));

import {
  mapBreakdownTotals,
  OverviewBreakdownBigNumbers,
} from '../../../src/components/chart/OverviewBreakdownBigNumbers';
import { oneClickHealthNetworkStatusCards } from '../../../src/components/chart/oneClickHealthNetworkStatus';

afterEach(() => {
  cleanup();
});

const brand = (
  brandUuid: string,
  interval: Array<Record<string, number | string>>,
) => ({ brandUuid, brandName: brandUuid, interval });

function cardValue(label: string): string {
  const card = screen.getByText(label).closest('.MuiPaper-root');
  if (!card) throw new Error(`no card for ${label}`);
  return within(card as HTMLElement).getByRole('heading').textContent ?? '';
}

describe('mapBreakdownTotals', () => {
  test('sums every dataKey of a card across intervals', () => {
    const totals = mapBreakdownTotals(
      [
        brand('b1', [
          { date: '2026-09-01', a: 2, b: 1 },
          { date: '2026-09-02', a: 3, b: 0 },
        ]),
      ],
      [{ key: 'ab', label: 'A+B', dataKeys: ['a', 'b'] }],
    );
    expect(totals).toEqual({ ab: 6 });
  });

  test('a card whose keys are absent from every interval totals 0', () => {
    const totals = mapBreakdownTotals(
      [brand('b1', [{ date: '2026-09-01', other: 9 }])],
      [{ key: 'x', label: 'X', dataKeys: ['missing'] }],
    );
    expect(totals).toEqual({ x: 0 });
  });

  test('ignores non-numeric values instead of producing NaN', () => {
    const totals = mapBreakdownTotals(
      [brand('b1', [{ date: '2026-09-01', a: 'n/a' }])],
      [{ key: 'a', label: 'A', dataKeys: ['a'] }],
    );
    expect(totals).toEqual({ a: 0 });
  });
});

describe('<OverviewBreakdownBigNumbers/> with the network status cards', () => {
  test('shows the three status cards summed across autofills and checks, and no No Rules card', () => {
    render(
      <OverviewBreakdownBigNumbers
        cards={oneClickHealthNetworkStatusCards}
        chartData={[
          brand('b1', [
            {
              date: '2026-09-01',
              oneClickHealthAutofillInNetwork: 2,
              oneClickHealthCheckInNetwork: 1,
              oneClickHealthAutofillIndeterminate: 1,
              oneClickHealthCheckOutOfNetwork: 3,
              oneClickHealthAutofillNoRules: 7,
              oneClickHealthCheckNoRules: 7,
            },
          ]),
        ]}
      />,
    );
    expect(cardValue('In Network')).toBe('3');
    expect(cardValue('Indeterminate')).toBe('1');
    expect(cardValue('Out of Network')).toBe('3');
    expect(screen.queryByText(/no rules/i)).toBeNull();
    expect(screen.getAllByRole('heading')).toHaveLength(3);
  });

  test('reads zero when the response lacks the status fields', () => {
    render(
      <OverviewBreakdownBigNumbers
        cards={oneClickHealthNetworkStatusCards}
        chartData={[
          brand('b1', [
            {
              date: '2026-09-01',
              oneClickHealthCreated: 4,
              oneClickHealthSucceeded: 4,
            },
          ]),
        ]}
      />,
    );
    expect(cardValue('In Network')).toBe('0');
    expect(cardValue('Indeterminate')).toBe('0');
    expect(cardValue('Out of Network')).toBe('0');
  });

  test('sums the selected brands', () => {
    render(
      <OverviewBreakdownBigNumbers
        cards={oneClickHealthNetworkStatusCards}
        chartData={[
          brand('b1', [
            { date: '2026-09-01', oneClickHealthAutofillInNetwork: 2 },
          ]),
          brand('b2', [
            { date: '2026-09-01', oneClickHealthAutofillInNetwork: 5 },
          ]),
        ]}
      />,
    );
    expect(cardValue('In Network')).toBe('7');
  });

  test('shows zeros while loading even if stale data is present', () => {
    render(
      <OverviewBreakdownBigNumbers
        cards={oneClickHealthNetworkStatusCards}
        chartData={[
          brand('b1', [
            { date: '2026-09-01', oneClickHealthAutofillInNetwork: 2 },
          ]),
        ]}
        isLoading
      />,
    );
    expect(cardValue('In Network')).toBe('0');
  });
});
