import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { useState, type ReactElement } from 'react';

import type { DataTableFilterState } from '../../../src/components/DataTable/DataTable.types';
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

    // Condition count chip next to the name, calendar day, notes as plain text.
    const rowTexts = Array.from(
      container.querySelectorAll('tbody tr[data-index]'),
    ).map((row) => row.textContent ?? '');
    expect(rowTexts[0]).toContain('First rule');
    expect(rowTexts[0]).toContain('3 conditions');
    expect(rowTexts[0]).toContain('October 1, 2026');
    expect(rowTexts[0]).toContain('Some note');
    expect(rowTexts[1]).toContain('Second rule');
    expect(rowTexts[1]).toContain('0 conditions');
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
    const onEditCondition = vi.fn();
    const onDeleteCondition = vi.fn();

    const { findByText, getByRole, getAllByRole, findByRole } = renderTable({
      onToggleEnabled,
      onEdit,
      onDelete,
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

  test('offers a filter per catalog key, with the control its shape implies', async () => {
    const { findByText, getByRole } = renderTable();
    await findByText('In Network');

    fireEvent.click(getByRole('button', { name: 'Show filters' }));

    expect(getByRole('combobox', { name: 'Status' })).toBeDefined();
    expect(getByRole('combobox', { name: 'Enabled' })).toBeDefined();
    expect(
      getByRole('combobox', { name: 'Has Condition with Key' }),
    ).toBeDefined();
    // A pick-list for the inline key, a searched list for the remote one, text for the rest.
    expect(getByRole('combobox', { name: 'Color' })).toBeDefined();
    expect(getByRole('combobox', { name: 'Remote Thing' })).toBeDefined();
    expect(getByRole('combobox', { name: 'Free Text' })).toBeDefined();
  });

  test('suggests the key presets under a free-text filter, and takes anything typed', async () => {
    const onFilterStateChange = vi.fn();
    const { findByText, getByRole, findByRole } = renderTable({
      manualFiltering: true,
      filterState: {},
      onFilterStateChange,
    });
    await findByText('In Network');

    fireEvent.click(getByRole('button', { name: 'Show filters' }));
    const input = getByRole('combobox', { name: 'Free Text' });

    // The key's presets are offered as suggestions.
    fireEvent.mouseDown(input);
    expect(await findByRole('option', { name: 'Gold plan' })).toBeDefined();

    fireEvent.change(input, { target: { value: 'Aviato' } });

    expect(onFilterStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        'condition.text': {
          kind: 'text',
          operator: 'contains',
          value: 'Aviato',
        },
      }),
    );
  });

  test('searches a remote key through the module source as the list opens', async () => {
    const { findByText, getByRole, findByRole } = renderTable();
    await findByText('In Network');

    fireEvent.click(getByRole('button', { name: 'Show filters' }));
    fireEvent.mouseDown(getByRole('combobox', { name: 'Remote Thing' }));

    const option = await findByRole('option', { name: /Thing One/ });
    expect(getByRole('option', { name: /Thing Two/ })).toBeDefined();
    // Shown as the editor shows them: the logo, the label, and the stored code.
    expect(option.textContent).toContain('t1');
    expect(option.querySelector('.MuiAvatar-root')).not.toBeNull();
    // Only the loaded page is known, so there is nothing to select all of.
    expect(getByRole('listbox').textContent).not.toContain('Select all');
  });

  test('keeps a picked remote value labelled after the panel is closed and reopened', async () => {
    function Harness() {
      const [filterState, setFilterState] = useState<DataTableFilterState>({});

      return (
        <NetworkRulesProvider services={createServices()}>
          <NetworkRulesTable
            rules={rules}
            manualFiltering
            filterState={filterState}
            onFilterStateChange={setFilterState}
          />
        </NetworkRulesProvider>
      );
    }

    const { findByText, getByRole, findByRole } = render(<Harness />);
    await findByText('In Network');

    fireEvent.click(getByRole('button', { name: 'Show filters' }));
    fireEvent.mouseDown(getByRole('combobox', { name: 'Remote Thing' }));
    fireEvent.click(await findByRole('option', { name: /Thing One/ }));

    // Close the option list, then the panel itself.
    fireEvent.keyDown(getByRole('combobox', { name: 'Remote Thing' }), {
      key: 'Escape',
    });
    fireEvent.keyDown(document.querySelector('.MuiPopover-root') as Element, {
      key: 'Escape',
    });
    await waitFor(() => {
      expect(document.querySelector('.MuiPopover-root')).toBeNull();
    });

    fireEvent.click(getByRole('button', { name: 'Show filters' }));

    // The chip still carries what the source returned, not the bare id.
    const chip = (await findByText('Thing One')).closest('.MuiChip-root');
    expect(chip?.querySelector('.MuiAvatar-root')).not.toBeNull();
  });

  test('shows an inline key its codes, without a logo', async () => {
    const { findByText, getByRole, findByRole } = renderTable();
    await findByText('In Network');

    fireEvent.click(getByRole('button', { name: 'Show filters' }));
    fireEvent.mouseDown(getByRole('combobox', { name: 'Color' }));

    const option = await findByRole('option', { name: /Red/ });
    expect(option.textContent).toContain('r');
    expect(option.querySelector('.MuiAvatar-root')).toBeNull();
  });

  test('reports header sorting for the columns the API sorts by', async () => {
    const onSortingChange = vi.fn();
    const { findByText, getByText } = renderTable({
      manualSorting: true,
      sorting: [],
      onSortingChange,
    });
    await findByText('In Network');

    fireEvent.click(getByText('Rule Name'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'name', desc: false },
    ]);

    fireEvent.click(getByText('Status'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'status', desc: false },
    ]);

    // A boolean column opens descending, so enabled rules come first.
    fireEvent.click(getByText('Enabled'));
    expect(onSortingChange).toHaveBeenLastCalledWith([
      { id: 'enabled', desc: true },
    ]);

    // Dates and notes have no server sort, so their headers are plain labels.
    onSortingChange.mockClear();
    fireEvent.click(getByText('Notes'));
    expect(onSortingChange).not.toHaveBeenCalled();
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
