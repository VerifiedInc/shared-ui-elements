import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';

import {
  NetworkRulesMetricsTable,
  type NetworkRulesMetricsTableProps,
  type NetworkRulesMetricsTableRow,
} from '../../../src/components/chart/NetworkRulesMetricsTable';

// jsdom has no layout, so the virtualizer would render zero rows. Mock it to
// render every row (same approach as DataTable.test.tsx).
vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: ({
    count,
    estimateSize,
  }: {
    count: number;
    estimateSize: () => number;
  }) => {
    const size = estimateSize();
    return {
      getVirtualItems: () =>
        Array.from({ length: count }, (_, index) => ({
          index,
          key: index,
          start: index * size,
          end: (index + 1) * size,
          size,
          lane: 0,
        })),
      getTotalSize: () => count * size,
      measure: () => undefined,
      measureElement: () => undefined,
      scrollToOffset: () => undefined,
    };
  },
}));

const rows: NetworkRulesMetricsTableRow[] = [
  {
    uuid: 'a1b2c3d4-0000-4000-8000-000000000001',
    name: 'First rule',
    status: 'IN_NETWORK',
    notes: 'Some note',
    conditions: [{}, {}, {}],
    matches: 12480,
    conflicts: 320,
  },
  {
    uuid: '6f1c2a3e-1b2c-4d5e-8f90-0a1b2c3d4e5f',
    name: 'Second rule',
    status: 'UNKNOWN',
    notes: null,
    conditions: [],
    matches: 0,
    conflicts: 0,
  },
];

function renderTable(
  props: Partial<NetworkRulesMetricsTableProps> = {},
): ReturnType<typeof render> {
  const ui: ReactElement = <NetworkRulesMetricsTable data={rows} {...props} />;
  return render(ui);
}

afterEach(() => {
  cleanup();
});

describe('<NetworkRulesMetricsTable/>', () => {
  test('renders each rule with its counts', () => {
    const { getByText, container } = renderTable();

    expect(getByText('Rule Name')).toBeDefined();
    expect(getByText('Rule UUID')).toBeDefined();
    expect(getByText('Status')).toBeDefined();
    expect(getByText('Notes')).toBeDefined();
    expect(getByText('Matches')).toBeDefined();
    expect(getByText('Conflicts')).toBeDefined();

    const rowTexts = Array.from(
      container.querySelectorAll('tbody tr[data-index]'),
    ).map((row) => row.textContent ?? '');

    // Name with its condition count, truncated uuid, status chip, note chip, counts.
    expect(rowTexts[0]).toContain('First rule');
    expect(rowTexts[0]).toContain('3 conditions');
    expect(rowTexts[0]).toContain('a1b2c3d4…0001');
    expect(rowTexts[0]).toContain('In Network');
    expect(rowTexts[0]).toContain('Some note');
    expect(rowTexts[0]).toContain('12,480');
    expect(rowTexts[0]).toContain('320');

    // A quiet rule reads 0 / 0, and an unknown status still renders Title Cased.
    expect(rowTexts[1]).toContain('Second rule');
    expect(rowTexts[1]).toContain('0 conditions');
    expect(rowTexts[1]).toContain('Unknown');
    expect(rowTexts[1]).toContain('0');
  });

  test('sorts its own rows by any column, counts included', () => {
    const onSortingChange = vi.fn();
    const { getByText } = renderTable({ onSortingChange });

    // A count column opens descending, so the busiest rules come first.
    fireEvent.click(getByText('Matches'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'matches', desc: true },
    ]);

    fireEvent.click(getByText('Rule Name'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'name', desc: false },
    ]);
  });

  test('offers only the columns the API sorts by when sorting is manual', () => {
    const onSortingChange = vi.fn();
    const { getByText } = renderTable({
      manualSorting: true,
      sorting: [],
      onSortingChange,
    });

    fireEvent.click(getByText('Rule Name'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'name', desc: false },
    ]);

    fireEvent.click(getByText('Status'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'status', desc: false },
    ]);

    // The counts are joined onto the page after the API pages it, so it cannot order by them.
    onSortingChange.mockClear();
    fireEvent.click(getByText('Matches'));
    fireEvent.click(getByText('Conflicts'));
    expect(onSortingChange).not.toHaveBeenCalled();
  });

  test('shows the empty message when the brand has no rules', () => {
    const { getByText } = renderTable({ data: [] });

    expect(getByText('No network rules yet')).toBeDefined();
  });
});
