import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import type { ReactElement } from 'react';

import {
  NetworkRulesProvider,
  NetworkRulesTable,
  type NetworkRulesTableProps,
} from '../../../src/components/NetworkRules';

import { catalog, createServices, rules } from './fixtures';

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

function renderTable(
  props: Partial<NetworkRulesTableProps> = {},
): ReturnType<typeof render> {
  const ui: ReactElement = (
    <NetworkRulesProvider services={createServices()}>
      <NetworkRulesTable rules={rules} {...props} />
    </NetworkRulesProvider>
  );
  return render(ui);
}

afterEach(() => {
  cleanup();
});

describe('<NetworkRulesTable/>', () => {
  test('renders the rule columns from the catalog', async () => {
    const { getByText, findByText, getAllByText, container } = renderTable();

    // Header
    expect(getByText('Rule Name')).toBeDefined();
    expect(getByText('Status')).toBeDefined();
    expect(getByText('Starts')).toBeDefined();
    expect(getByText('Ends')).toBeDefined();
    expect(getByText('Notes')).toBeDefined();

    // Rows render once the catalog loads; an unknown status is Title Cased.
    expect(await findByText('In Network')).toBeDefined();
    expect(getByText('Unknown')).toBeDefined();

    // Condition count column, calendar day, notes as plain text.
    expect(getByText('Conditions')).toBeDefined();
    const rowTexts = Array.from(
      container.querySelectorAll('tbody tr[data-index]'),
    ).map((row) => row.textContent ?? '');
    expect(rowTexts[0]).toContain('First rule');
    expect(rowTexts[0]).toContain('3');
    expect(rowTexts[0]).toContain('October 1, 2026');
    expect(rowTexts[0]).toContain('Some note');
    expect(rowTexts[1]).toContain('Second rule');
    expect(rowTexts[1]).toContain('0');
    expect(getAllByText('-').length).toBeGreaterThan(0);
  });

  test('expanding a row shows its conditions with catalog labels and resolved values', async () => {
    const { findByText, getAllByRole, findByRole, getByText } = renderTable();
    await findByText('In Network');

    fireEvent.click(getAllByRole('button', { name: 'Expand row' })[0]);

    const conditions = await findByRole('table', {
      name: 'Conditions for First rule',
    });
    expect(conditions).toBeDefined();

    // Key / operator labels from the catalog.
    expect(getByText('Color')).toBeDefined();
    expect(getByText('Remote Thing')).toBeDefined();
    expect(getByText('Free Text')).toBeDefined();
    expect(getByText('includes')).toBeDefined();

    // Inline option labels, remote resolve, raw text.
    expect(getByText('Red')).toBeDefined();
    expect(getByText('Green')).toBeDefined();
    expect(await findByText('Thing One')).toBeDefined();
    expect(getByText('ppo')).toBeDefined();

    // Rule UUID is shown in the panel.
    expect(getByText('rule-1')).toBeDefined();
  });

  test('reports toggles and row actions through callbacks', async () => {
    const onToggleEnabled = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onAddCondition = vi.fn();
    const onEditCondition = vi.fn();
    const onDeleteCondition = vi.fn();

    const { findByText, getByRole, getAllByRole, findByRole } = renderTable({
      onToggleEnabled,
      onEdit,
      onDelete,
      onAddCondition,
      onEditCondition,
      onDeleteCondition,
    });
    await findByText('In Network');

    fireEvent.click(getByRole('checkbox', { name: 'Disable rule First rule' }));
    expect(onToggleEnabled).toHaveBeenCalledWith(rules[0], false);

    fireEvent.click(getAllByRole('button', { name: 'Expand row' })[0]);
    await findByRole('table', { name: 'Conditions for First rule' });

    fireEvent.click(getByRole('button', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledWith(rules[0]);

    fireEvent.click(getByRole('button', { name: 'Add Condition' }));
    expect(onAddCondition).toHaveBeenCalledWith(rules[0]);

    fireEvent.click(getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledWith(rules[0]);

    fireEvent.click(getByRole('button', { name: 'Edit condition 2' }));
    expect(onEditCondition).toHaveBeenCalledWith(rules[0], 1);

    fireEvent.click(getByRole('button', { name: 'Delete condition 3' }));
    expect(onDeleteCondition).toHaveBeenCalledWith(rules[0], 2);
  });

  test('read-only hides actions and disables the toggle', async () => {
    const { findByText, getByRole, getAllByRole, queryByRole, findByRole } =
      renderTable({
        readOnly: true,
        onToggleEnabled: vi.fn(),
        onEdit: vi.fn(),
        onDeleteCondition: vi.fn(),
      });
    await findByText('In Network');

    const toggle = getByRole('checkbox', {
      name: 'Disable rule First rule',
    }) as HTMLInputElement;
    expect(toggle.disabled).toBe(true);

    fireEvent.click(getAllByRole('button', { name: 'Expand row' })[0]);
    await findByRole('table', { name: 'Conditions for First rule' });

    expect(queryByRole('button', { name: 'Edit' })).toBeNull();
    expect(queryByRole('button', { name: 'Delete condition 1' })).toBeNull();
  });

  test('holds the rows until the catalog is ready, and offers a retry when it fails', async () => {
    let fail = true;
    const getCatalog = vi.fn(async () => {
      if (fail) throw new Error('nope');
      return catalog;
    });
    const services = createServices({
      getCatalog,
      // No automatic retries here, so the failure surfaces immediately.
      queryClient: new QueryClient({
        defaultOptions: { queries: { retry: false } },
      }),
    });
    const { findByRole, findByText, queryByText } = render(
      <NetworkRulesProvider services={services}>
        <NetworkRulesTable rules={rules} />
      </NetworkRulesProvider>,
    );

    const retry = await findByRole('button', { name: 'Retry' });
    // No rule is rendered while the catalog is missing — not even its raw values.
    expect(queryByText('First rule')).toBeNull();
    expect(queryByText('Unknown')).toBeNull();

    fail = false;
    fireEvent.click(retry);

    expect(await findByText('In Network')).toBeDefined();
    expect(queryByText('First rule')).toBeDefined();
    expect(getCatalog).toHaveBeenCalledTimes(2);
  });
});
