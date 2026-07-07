import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import type { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@mui/material';

import {
  DataTable,
  dataTableFilterFn,
  type DataTableActiveFilters,
  type DataTableFilterField,
  type DataTableFilterOperator,
  type DataTableFilterState,
  type DataTableRowContext,
} from '../../src/components/DataTable';

// jsdom has no layout, so the virtualizer would render zero rows. Mock it to
// render every row of the current page.
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

type Member = {
  email: string;
  role: string;
  mfaEnabled: boolean | null;
};

const members: Member[] = [
  { email: 'charlie@verified.inc', role: 'admin', mfaEnabled: true },
  { email: 'alpha@verified.inc', role: 'member', mfaEnabled: null },
  { email: 'bravo@verified.inc', role: 'member', mfaEnabled: false },
];

// Data rows carry a `data-index` attribute (via rowProps); the full-width
// divider rows below them do not.
function getBodyRowTexts(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('tbody tr[data-index]')).map(
    (row) => row.textContent ?? '',
  );
}

// Header labels only — icon buttons inside the cells contribute no text.
function getHeaderTexts(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('thead th')).map(
    (cell) => cell.textContent ?? '',
  );
}

afterEach(() => {
  cleanup();
});

describe('<DataTable/>', () => {
  test('infers columns from the keys of the first row', () => {
    const { getByText } = render(<DataTable data={members} />);

    expect(getByText('Email')).toBeDefined();
    expect(getByText('Role')).toBeDefined();
    expect(getByText('Mfa Enabled')).toBeDefined();
  });

  test('renders default cells with formatted values', () => {
    const { getByText, container } = render(<DataTable data={members} />);

    expect(getByText('charlie@verified.inc')).toBeDefined();
    expect(getByText('true')).toBeDefined();
    // null renders as the em dash placeholder
    expect(getBodyRowTexts(container)[1]).toContain('—');
  });

  test('sorts rows when a header is clicked', () => {
    const { getByText, container } = render(<DataTable data={members} />);

    // Insertion order before sorting.
    expect(getBodyRowTexts(container)[0]).toContain('charlie@verified.inc');

    fireEvent.click(getByText('Email'));
    expect(getBodyRowTexts(container)[0]).toContain('alpha@verified.inc');

    fireEvent.click(getByText('Email'));
    expect(getBodyRowTexts(container)[0]).toContain('charlie@verified.inc');
  });

  test('applies initial sorting', () => {
    const { container } = render(
      <DataTable
        data={members}
        initialSorting={[{ id: 'email', desc: false }]}
      />,
    );

    const rows = getBodyRowTexts(container);
    expect(rows[0]).toContain('alpha@verified.inc');
    expect(rows[2]).toContain('charlie@verified.inc');
  });

  test('paginates rows and navigates between pages', () => {
    const data = Array.from({ length: 30 }, (_, index) => ({
      name: `Row ${String(index).padStart(2, '0')}`,
    }));

    const { container, getByText, getByRole } = render(
      <DataTable data={data} initialPageSize={10} />,
    );

    expect(getBodyRowTexts(container)).toHaveLength(10);
    expect(getByText('1–10 of 30')).toBeDefined();

    fireEvent.click(getByRole('button', { name: /next page/i }));

    expect(getBodyRowTexts(container)[0]).toContain('Row 10');
    expect(getByText('11–20 of 30')).toBeDefined();
  });

  test('renders all rows without a footer when pagination is disabled', () => {
    const data = Array.from({ length: 30 }, (_, index) => ({
      name: `Row ${index}`,
    }));

    const { container, queryByText } = render(
      <DataTable data={data} disablePagination />,
    );

    expect(getBodyRowTexts(container)).toHaveLength(30);
    expect(queryByText(/of 30/)).toBeNull();
  });

  test('supports custom column definitions', () => {
    const { getByText, queryByText } = render(
      <DataTable
        data={members}
        columns={[
          {
            id: 'email',
            accessorFn: (row) => row.email,
            header: 'Team Member',
            cell: (info) => `Email: ${info.getValue()}`,
          },
        ]}
      />,
    );

    expect(getByText('Team Member')).toBeDefined();
    expect(getByText('Email: charlie@verified.inc')).toBeDefined();
    expect(queryByText('Role')).toBeNull();
  });

  test('renders custom rows via renderRow', () => {
    const renderRow = ({ row, rowProps }: DataTableRowContext<Member>) => (
      <TableRow {...rowProps}>
        <TableCell colSpan={3}>Custom: {row.original.email}</TableCell>
      </TableRow>
    );

    const { getByText } = render(
      <DataTable data={members} renderRow={renderRow} />,
    );

    expect(getByText('Custom: charlie@verified.inc')).toBeDefined();
  });

  test('supports expandable rows via the TanStack expansion API', () => {
    const renderRow = ({ row, rowProps }: DataTableRowContext<Member>) => (
      <>
        <TableRow {...rowProps} onClick={row.getToggleExpandedHandler()}>
          <TableCell colSpan={3}>{row.original.email}</TableCell>
        </TableRow>
        {row.getIsExpanded() && (
          <TableRow>
            <TableCell colSpan={3}>{`Details: ${row.original.role}`}</TableCell>
          </TableRow>
        )}
      </>
    );

    const { getByText, queryByText } = render(
      <DataTable data={members} renderRow={renderRow} />,
    );

    expect(queryByText('Details: admin')).toBeNull();

    fireEvent.click(getByText('charlie@verified.inc'));
    expect(getByText('Details: admin')).toBeDefined();

    fireEvent.click(getByText('charlie@verified.inc'));
    expect(queryByText('Details: admin')).toBeNull();
  });

  test('renderRow can fall back to the default row markup', () => {
    const renderRow = ({ renderDefaultRow }: DataTableRowContext<Member>) =>
      renderDefaultRow();

    const { getByText } = render(
      <DataTable data={members} renderRow={renderRow} />,
    );

    expect(getByText('charlie@verified.inc')).toBeDefined();
  });

  test('shows the empty message when there is no data', () => {
    const { getByText } = render(
      <DataTable data={[]} emptyMessage='No member found!' />,
    );

    expect(getByText('No member found!')).toBeDefined();
  });

  test('shows a loading row while loading with no data', () => {
    const { getByText } = render(<DataTable data={[]} isLoading />);

    expect(getByText('Loading...')).toBeDefined();
  });

  test('renders a custom loading state via renderLoading', () => {
    const { getAllByText, queryByText } = render(
      <DataTable
        data={[]}
        isLoading
        renderLoading={(columnCount) => (
          <>
            {Array.from({ length: 3 }, (_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={columnCount}>Loading skeleton</TableCell>
              </TableRow>
            ))}
          </>
        )}
      />,
    );

    expect(getAllByText('Loading skeleton')).toHaveLength(3);
    expect(queryByText('Loading...')).toBeNull();
  });

  describe('column menu', () => {
    test('reveals a kebab menu button per leaf header when enabled', () => {
      const { getByLabelText, queryByLabelText, rerender } = render(
        <DataTable data={members} />,
      );

      expect(queryByLabelText('Email column menu')).toBeNull();

      rerender(<DataTable data={members} enableColumnMenu />);

      expect(getByLabelText('Email column menu')).toBeDefined();
      expect(getByLabelText('Role column menu')).toBeDefined();
    });

    test('sorts ascending and descending from the menu', () => {
      const { getByLabelText, getByText, container } = render(
        <DataTable data={members} enableColumnMenu />,
      );

      // Insertion order before sorting.
      expect(getBodyRowTexts(container)[0]).toContain('charlie@verified.inc');

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Sort by ASC'));
      expect(getBodyRowTexts(container)[0]).toContain('alpha@verified.inc');

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Sort by DESC'));
      expect(getBodyRowTexts(container)[0]).toContain('charlie@verified.inc');
    });

    test('hides the kebab on columns opting out via meta.disableColumnMenu', () => {
      const { getByLabelText, queryByLabelText } = render(
        <DataTable
          data={members}
          enableColumnMenu
          columns={[
            {
              id: 'expand',
              header: '',
              meta: { disableColumnMenu: true },
            },
            { id: 'email', accessorFn: (row) => row.email, header: 'Email' },
          ]}
        />,
      );

      // The utility column has no menu...
      expect(queryByLabelText('Expand column menu')).toBeNull();
      // ...while the others still do.
      expect(getByLabelText('Email column menu')).toBeDefined();
    });

    test('omits the sort items for non-sortable columns', () => {
      const { getByLabelText, queryByText } = render(
        <DataTable
          data={members}
          enableColumnMenu
          columns={[
            { id: 'email', accessorFn: (row) => row.email, header: 'Email' },
          ]}
        />,
      );

      fireEvent.click(getByLabelText('Email column menu'));

      expect(queryByText('Sort by ASC')).toBeNull();
      expect(queryByText('Sort by DESC')).toBeNull();
    });
  });

  describe('column filtering', () => {
    test('filters rows through the filter panel (single row, contains)', () => {
      const { getByLabelText, getByText, getByPlaceholderText, container } =
        render(<DataTable data={members} enableColumnMenu />);

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      // Panel opens preselecting the menu's column with `contains` —
      // a multi-value operator, so values commit as chips on Enter.
      const valueInput = getByPlaceholderText('Filter value');
      fireEvent.change(valueInput, { target: { value: 'alpha' } });
      fireEvent.keyDown(valueInput, { key: 'Enter' });

      const rows = getBodyRowTexts(container);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toContain('alpha@verified.inc');
    });

    test('contains accepts multiple chip values that OR within the row', () => {
      const { getByLabelText, getByText, getByPlaceholderText, container } =
        render(<DataTable data={members} enableColumnMenu />);

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      const valueInput = getByPlaceholderText('Filter value');
      fireEvent.change(valueInput, { target: { value: 'alpha' } });
      fireEvent.keyDown(valueInput, { key: 'Enter' });
      expect(getBodyRowTexts(container)).toHaveLength(1);

      // A second chip widens the match — the row ORs its values.
      fireEvent.change(valueInput, { target: { value: 'bravo' } });
      fireEvent.keyDown(valueInput, { key: 'Enter' });
      expect(getBodyRowTexts(container)).toHaveLength(2);

      // Deleting a chip through its close button narrows it again.
      const chip = getByText('alpha').parentElement;
      fireEvent.click(chip?.querySelector('.MuiChip-deleteIcon') as Element);

      expect(getBodyRowTexts(container)).toHaveLength(1);
      expect(getBodyRowTexts(container)[0]).toContain('bravo@verified.inc');
    });

    test('suggests the distinct column values in the value input', () => {
      const {
        getByLabelText,
        getByText,
        getByPlaceholderText,
        getByRole,
        getAllByRole,
        container,
      } = render(<DataTable data={members} enableColumnMenu />);

      fireEvent.click(getByLabelText('Role column menu'));
      fireEvent.click(getByText('Filter'));

      // ArrowDown opens the suggestion list: deduped and sorted.
      fireEvent.keyDown(getByPlaceholderText('Filter value'), {
        key: 'ArrowDown',
      });
      expect(
        getAllByRole('option').map((option) => option.textContent),
      ).toEqual(['admin', 'member']);

      // Picking a suggestion commits it as a chip and filters.
      fireEvent.click(getByRole('option', { name: 'admin' }));
      expect(getBodyRowTexts(container)).toHaveLength(1);
      expect(getBodyRowTexts(container)[0]).toContain('charlie@verified.inc');
    });

    test('meta.filterOptions overrides the derived suggestions', () => {
      const { getByLabelText, getByText, getByPlaceholderText, getAllByRole } =
        render(
          <DataTable
            data={members}
            enableColumnMenu
            columns={[
              {
                id: 'email',
                accessorFn: (row) => row.email,
                header: 'Email',
                meta: { filterOptions: ['@verified.inc', '@example.com'] },
              },
            ]}
          />,
        );

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      fireEvent.keyDown(getByPlaceholderText('Filter value'), {
        key: 'ArrowDown',
      });
      expect(
        getAllByRole('option').map((option) => option.textContent),
      ).toEqual(['@verified.inc', '@example.com']);
    });

    test('meta.filterOperators restricts the operator dropdown', () => {
      const { getByLabelText, getByText, getByRole, getAllByRole } = render(
        <DataTable
          data={members}
          enableColumnMenu
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              meta: { filterOperators: ['equals', 'isAnyOf'] },
            },
          ]}
        />,
      );

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      fireEvent.mouseDown(getByRole('combobox', { name: 'Operator' }));
      // Only the allowed operators are offered, in canonical display order.
      expect(
        getAllByRole('option').map((option) => option.textContent),
      ).toEqual(['equals', 'is any of']);
    });

    test('defaults a new row to the first allowed operator when contains is excluded', () => {
      const { getByLabelText, getByText, getByRole } = render(
        <DataTable
          data={members}
          enableColumnMenu
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              meta: { filterOperators: ['equals', 'isAnyOf'] },
            },
          ]}
        />,
      );

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      // `contains` (the usual default) isn't allowed, so the row opens on `equals`.
      expect(getByRole('combobox', { name: 'Operator' }).textContent).toBe(
        'equals',
      );
    });

    test('supports operators without a value input (is empty)', () => {
      const { getByLabelText, getByText, getByRole, container } = render(
        <DataTable data={members} enableColumnMenu />,
      );

      fireEvent.click(getByLabelText('Mfa Enabled column menu'));
      fireEvent.click(getByText('Filter'));

      fireEvent.mouseDown(getByRole('combobox', { name: 'Operator' }));
      fireEvent.click(getByRole('option', { name: 'is empty' }));

      // Only alpha has null mfaEnabled.
      const rows = getBodyRowTexts(container);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toContain('alpha@verified.inc');
    });

    test('adds a second filter row that ANDs with the first', () => {
      const { getByLabelText, getByText, getAllByPlaceholderText, container } =
        render(<DataTable data={members} enableColumnMenu />);

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      // First row: email contains 'a' → alpha + bravo + charlie all match.
      const firstInput = getAllByPlaceholderText('Filter value')[0];
      fireEvent.change(firstInput, { target: { value: 'a' } });
      fireEvent.keyDown(firstInput, { key: 'Enter' });
      expect(getBodyRowTexts(container)).toHaveLength(3);

      // Add a second row for email contains 'charlie' → only charlie
      // matches both.
      fireEvent.click(getByText('Add filter'));
      const valueInputs = getAllByPlaceholderText('Filter value');
      const secondInput = valueInputs[valueInputs.length - 1];
      fireEvent.change(secondInput, { target: { value: 'charlie' } });
      fireEvent.keyDown(secondInput, { key: 'Enter' });
      expect(getBodyRowTexts(container)).toHaveLength(1);
      expect(getBodyRowTexts(container)[0]).toContain('charlie@verified.inc');
    });

    test('switching to OR logic makes rows match any condition', () => {
      const {
        getByLabelText,
        getByText,
        getAllByPlaceholderText,
        getByRole,
        container,
      } = render(<DataTable data={members} enableColumnMenu />);

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      // Row 1: email contains 'alpha'.
      const firstInput = getAllByPlaceholderText('Filter value')[0];
      fireEvent.change(firstInput, { target: { value: 'alpha' } });
      fireEvent.keyDown(firstInput, { key: 'Enter' });

      // Add row 2: email contains 'bravo'.
      fireEvent.click(getByText('Add filter'));
      const secondInput = getAllByPlaceholderText('Filter value')[1];
      fireEvent.change(secondInput, { target: { value: 'bravo' } });
      fireEvent.keyDown(secondInput, { key: 'Enter' });

      // AND: must match both → zero rows (no email contains both 'alpha' and 'bravo').
      expect(getBodyRowTexts(container)).toHaveLength(0);

      // Switch to OR.
      fireEvent.mouseDown(
        getByRole('combobox', { name: 'Filter logic operator' }),
      ); // the And/Or select
      fireEvent.click(getByRole('option', { name: 'Or' }));

      // OR: matches alpha OR bravo → 2 rows.
      expect(getBodyRowTexts(container)).toHaveLength(2);
    });

    test('shows an indicator on a filtered column that reopens the panel', () => {
      const { getByLabelText, getByText, container } = render(
        <DataTable
          data={members}
          enableColumnMenu
          initialFilters={{
            rows: [
              {
                id: 'f1',
                columnId: 'email',
                operator: 'contains',
                value: 'alpha',
              },
            ],
            logicOperator: 'and',
          }}
        />,
      );

      expect(getBodyRowTexts(container)).toHaveLength(1);

      fireEvent.click(getByLabelText('Email filter'));

      // The single string value renders as one chip.
      expect(getByText('alpha')).toBeDefined();
    });

    test('removes a single row through its X button', () => {
      const { getByLabelText, container } = render(
        <DataTable
          data={members}
          enableColumnMenu
          initialFilters={{
            rows: [
              {
                id: 'f1',
                columnId: 'email',
                operator: 'contains',
                value: 'alpha',
              },
            ],
            logicOperator: 'and',
          }}
        />,
      );

      expect(getBodyRowTexts(container)).toHaveLength(1);

      fireEvent.click(getByLabelText('Email filter'));
      fireEvent.click(getByLabelText('Remove filter row 1'));

      expect(getBodyRowTexts(container)).toHaveLength(3);
    });

    test('Remove all clears every row and closes the panel', () => {
      const { getByLabelText, getByText, queryByText, container } = render(
        <DataTable
          data={members}
          enableColumnMenu
          initialFilters={{
            rows: [
              {
                id: 'f1',
                columnId: 'email',
                operator: 'contains',
                value: 'alpha',
              },
              {
                id: 'f2',
                columnId: 'role',
                operator: 'equals',
                value: 'admin',
              },
            ],
            logicOperator: 'and',
          }}
        />,
      );

      fireEvent.click(getByLabelText('Email filter'));
      fireEvent.click(getByText('Remove all'));

      expect(getBodyRowTexts(container)).toHaveLength(3);
      // Panel closed — "Add filter" no longer visible.
      expect(queryByText('Add filter')).toBeNull();
    });

    test('manual filtering reports the new filter state without filtering rows', () => {
      const onFiltersChange = vi.fn();

      const { getByLabelText, getByText, getByPlaceholderText, container } =
        render(
          <DataTable
            data={members}
            enableColumnMenu
            manualFiltering
            onFiltersChange={onFiltersChange}
          />,
        );

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));
      const valueInput = getByPlaceholderText('Filter value');
      fireEvent.change(valueInput, { target: { value: 'alpha' } });
      fireEvent.keyDown(valueInput, { key: 'Enter' });

      // Rows untouched — server expected to filter.
      expect(getBodyRowTexts(container)).toHaveLength(3);
      const lastCall = onFiltersChange.mock.calls.at(
        -1,
      )?.[0] as DataTableActiveFilters;
      expect(lastCall.logicOperator).toBe('and');
      expect(lastCall.rows[0]).toMatchObject({
        columnId: 'email',
        operator: 'contains',
        value: ['alpha'],
      });
    });
  });

  describe('toolbar', () => {
    test('renders the toolbar buttons only when showToolbar is set', () => {
      const { getByLabelText, queryByLabelText, rerender } = render(
        <DataTable data={members} />,
      );

      expect(queryByLabelText('Manage columns')).toBeNull();
      expect(queryByLabelText('Show filters')).toBeNull();
      expect(queryByLabelText('Show search')).toBeNull();

      rerender(<DataTable data={members} showToolbar />);

      expect(getByLabelText('Manage columns')).toBeDefined();
      expect(getByLabelText('Show filters')).toBeDefined();
      expect(getByLabelText('Show search')).toBeDefined();
    });

    test('filters rows through the panel opened from the toolbar', () => {
      const { getByLabelText, getByPlaceholderText, container } = render(
        <DataTable data={members} showToolbar />,
      );

      fireEvent.click(getByLabelText('Show filters'));

      // Panel opens preselecting the first filterable column (email) with
      // `contains` — a multi-value operator, so the value commits as a
      // chip on Enter.
      const valueInput = getByPlaceholderText('Filter value');
      fireEvent.change(valueInput, { target: { value: 'alpha' } });
      fireEvent.keyDown(valueInput, { key: 'Enter' });

      const rows = getBodyRowTexts(container);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toContain('alpha@verified.inc');
    });

    test('toggles columns through the panel opened from the toolbar', () => {
      const { getByLabelText, getByRole, container } = render(
        <DataTable data={members} showToolbar />,
      );

      expect(getHeaderTexts(container)).toContain('Role');

      fireEvent.click(getByLabelText('Manage columns'));
      fireEvent.click(getByRole('checkbox', { name: 'Role' }));

      expect(getHeaderTexts(container)).not.toContain('Role');
    });

    test('shows the active filter count on the filter button badge', () => {
      const { getByLabelText } = render(
        <DataTable
          data={members}
          showToolbar
          initialFilters={{
            rows: [
              {
                id: 'f1',
                columnId: 'email',
                operator: 'contains',
                value: 'alpha',
              },
              {
                id: 'f2',
                columnId: 'role',
                operator: 'equals',
                value: 'admin',
              },
            ],
            logicOperator: 'or',
          }}
        />,
      );

      expect(getByLabelText('Show filters').textContent).toBe('2');
    });

    test('renders a consumer filter panel instead of the operator panel, with the supplied badge count', () => {
      const { getByLabelText, getByText, queryByText } = render(
        <DataTable
          data={members}
          showToolbar
          renderFilterPanel={() => <div>Custom filter content</div>}
          activeFilterCount={3}
        />,
      );

      // The badge reflects the consumer-provided count, not the internal operator-filter rows.
      expect(getByLabelText('Show filters').textContent).toBe('3');

      fireEvent.click(getByLabelText('Show filters'));

      // The consumer's content renders; the built-in operator panel ("Add filter") does not.
      expect(getByText('Custom filter content')).toBeDefined();
      expect(queryByText('Add filter')).toBeNull();
    });

    test('passes an onClose to renderFilterPanel so the panel can close itself', () => {
      const { getByLabelText, getByText, queryByText } = render(
        <DataTable
          data={members}
          showToolbar
          renderFilterPanel={({ onClose }) => (
            <button type='button' onClick={onClose}>
              Apply filters
            </button>
          )}
        />,
      );

      fireEvent.click(getByLabelText('Show filters'));
      expect(getByText('Apply filters')).toBeDefined();

      // The consumer's control closes the popover via the provided onClose.
      fireEvent.click(getByText('Apply filters'));
      expect(queryByText('Apply filters')).toBeNull();
    });

    test('searches rows through the toolbar search input', () => {
      const { getByLabelText, container } = render(
        <DataTable data={members} showToolbar />,
      );

      // The search button expands into the input by focusing it.
      fireEvent.click(getByLabelText('Show search'));
      fireEvent.change(getByLabelText('Search'), {
        target: { value: 'alpha' },
      });

      const rows = getBodyRowTexts(container);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toContain('alpha@verified.inc');
    });

    test('quick search matches any column value', () => {
      const { getByLabelText, container } = render(
        <DataTable data={members} showToolbar />,
      );

      // 'admin' only appears in the role column.
      fireEvent.change(getByLabelText('Search'), {
        target: { value: 'admin' },
      });

      const rows = getBodyRowTexts(container);
      expect(rows).toHaveLength(1);
      expect(rows[0]).toContain('charlie@verified.inc');
    });

    test('mounts with an initial search applied and clears it through the clear button', () => {
      const { getByLabelText, queryByLabelText, container } = render(
        <DataTable data={members} showToolbar initialSearch='alpha' />,
      );

      expect(getBodyRowTexts(container)).toHaveLength(1);

      fireEvent.click(getByLabelText('Clear search'));

      expect(getBodyRowTexts(container)).toHaveLength(3);
      // The clear button only renders while there is a query.
      expect(queryByLabelText('Clear search')).toBeNull();
    });

    test('Escape clears the search query', () => {
      const { getByLabelText, container } = render(
        <DataTable data={members} showToolbar initialSearch='alpha' />,
      );

      expect(getBodyRowTexts(container)).toHaveLength(1);

      fireEvent.keyDown(getByLabelText('Search'), { key: 'Escape' });

      expect((getByLabelText('Search') as HTMLInputElement).value).toBe('');
      expect(getBodyRowTexts(container)).toHaveLength(3);
    });

    test('manual filtering reports the search query without filtering rows', () => {
      const onSearchChange = vi.fn();

      const { getByLabelText, container } = render(
        <DataTable
          data={members}
          showToolbar
          manualFiltering
          onSearchChange={onSearchChange}
        />,
      );

      fireEvent.change(getByLabelText('Search'), {
        target: { value: 'alpha' },
      });

      // Rows untouched — server expected to filter.
      expect(getBodyRowTexts(container)).toHaveLength(3);
      expect(onSearchChange).toHaveBeenLastCalledWith('alpha');
    });

    test('anchors panels opened from a column menu to the toolbar button', () => {
      const { getByLabelText, getByText } = render(
        <DataTable data={members} showToolbar enableColumnMenu />,
      );

      // jsdom rects are all zeros — give the toolbar button a real one so
      // the panel position is observable.
      const toolbarButtonRect: DOMRect = {
        top: 80,
        bottom: 100,
        left: 280,
        right: 300,
        width: 20,
        height: 20,
        x: 280,
        y: 80,
        toJSON: () => ({}),
      };
      vi.spyOn(
        getByLabelText('Show filters'),
        'getBoundingClientRect',
      ).mockReturnValue(toolbarButtonRect);

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Filter'));

      // Anchored at the toolbar button's bottom edge — the column's kebab
      // has a zero rect, which would clamp to the 16px margin threshold.
      const paper = document.querySelector<HTMLElement>('.MuiPopover-paper');
      expect(paper?.style.top).toBe('100px');
      expect(paper?.style.left).toBe('300px');
    });
  });

  describe('column visibility', () => {
    test('hides a column from the menu', () => {
      const { getByLabelText, getByText, queryByText, container } = render(
        <DataTable data={members} enableColumnMenu />,
      );

      expect(getHeaderTexts(container)).toContain('Role');
      expect(getByText('admin')).toBeDefined();

      fireEvent.click(getByLabelText('Role column menu'));
      fireEvent.click(getByText('Hide column'));

      expect(getHeaderTexts(container)).not.toContain('Role');
      expect(queryByText('admin')).toBeNull();
    });

    test('omits the hide item for non-hideable columns', () => {
      const { getByLabelText, getByText, queryByText } = render(
        <DataTable
          data={members}
          enableColumnMenu
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              enableHiding: false,
            },
          ]}
        />,
      );

      fireEvent.click(getByLabelText('Email column menu'));

      expect(queryByText('Hide column')).toBeNull();
      expect(getByText('Manage columns')).toBeDefined();
    });

    test('toggles and searches columns in the manage columns panel', () => {
      const {
        getByLabelText,
        getByText,
        getByRole,
        queryByRole,
        getByPlaceholderText,
        container,
      } = render(<DataTable data={members} enableColumnMenu />);

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Manage columns'));

      // Unchecking hides the column behind the panel.
      fireEvent.click(getByRole('checkbox', { name: 'Role' }));
      expect(getHeaderTexts(container)).not.toContain('Role');

      // The search field narrows the checkbox list.
      fireEvent.change(getByPlaceholderText('Search'), {
        target: { value: 'email' },
      });
      expect(getByRole('checkbox', { name: 'Email' })).toBeDefined();
      expect(queryByRole('checkbox', { name: 'Role' })).toBeNull();
    });

    test('supports Show/Hide All and resets to the initial visibility', () => {
      const { getByLabelText, getByText, getByRole, container } = render(
        <DataTable
          data={members}
          enableColumnMenu
          initialColumnVisibility={{ role: false }}
        />,
      );

      expect(getHeaderTexts(container)).not.toContain('Role');

      fireEvent.click(getByLabelText('Email column menu'));
      fireEvent.click(getByText('Manage columns'));

      // Not all columns are visible (role is hidden), so the first click
      // checks the box and shows everything — MUI DataGrid semantics.
      fireEvent.click(getByRole('checkbox', { name: 'Show/Hide All' }));
      expect(getHeaderTexts(container)).toContain('Role');

      // All visible now — the next click hides everything at once.
      fireEvent.click(getByRole('checkbox', { name: 'Show/Hide All' }));
      expect(getHeaderTexts(container)).toHaveLength(0);

      // Reset restores the initial visibility (role hidden).
      fireEvent.click(getByText('Reset'));
      expect(getHeaderTexts(container)).toContain('Email');
      expect(getHeaderTexts(container)).not.toContain('Role');
    });

    test('reports visibility changes for controlled persistence', () => {
      const onColumnVisibilityChange = vi.fn();

      const { getByLabelText, getByText } = render(
        <DataTable
          data={members}
          enableColumnMenu
          onColumnVisibilityChange={onColumnVisibilityChange}
        />,
      );

      fireEvent.click(getByLabelText('Role column menu'));
      fireEvent.click(getByText('Hide column'));

      expect(onColumnVisibilityChange).toHaveBeenLastCalledWith({
        role: false,
      });
    });
  });

  describe('column resizing', () => {
    function getFirstHeaderCellAndResizer(container: HTMLElement) {
      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');
      const resizer = headerCell?.querySelector<HTMLElement>(
        '.DataTable-columnResizer',
      );

      if (!headerCell || !resizer) {
        throw new Error('Expected a header cell with a resize handle');
      }

      return { headerCell, resizer };
    }

    test('dragging a header separator resizes the column', () => {
      const { container } = render(
        <DataTable data={members} enableColumnResizing />,
      );

      const { headerCell, resizer } = getFirstHeaderCellAndResizer(container);
      expect(resizer).not.toBeNull();
      expect(headerCell.style.width).toBe('');

      // TanStack's default column size is 150 — drag the handle 50px right.
      fireEvent.mouseDown(resizer, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      fireEvent.mouseUp(document, { clientX: 150 });

      expect(headerCell.style.width).toBe('200px');
    });

    test('double-clicking a separator restores the default width', () => {
      const { container } = render(
        <DataTable data={members} enableColumnResizing />,
      );

      const { headerCell, resizer } = getFirstHeaderCellAndResizer(container);

      fireEvent.mouseDown(resizer, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      fireEvent.mouseUp(document, { clientX: 150 });
      expect(headerCell.style.width).toBe('200px');

      fireEvent.doubleClick(resizer);
      expect(headerCell.style.width).toBe('');
    });

    test('drags start from the rendered width when the column has no explicit size', () => {
      const { container } = render(
        <DataTable data={members} enableColumnResizing />,
      );

      const { headerCell, resizer } = getFirstHeaderCellAndResizer(container);

      // jsdom rects are all zeros — give the header cell a real width so
      // the drag start has something to measure.
      vi.spyOn(headerCell, 'getBoundingClientRect').mockReturnValue({
        top: 0,
        bottom: 53,
        left: 0,
        right: 300,
        width: 300,
        height: 53,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      fireEvent.mouseDown(resizer, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      fireEvent.mouseUp(document, { clientX: 150 });

      // 300px measured + 50px dragged — not TanStack's 150px default + 50.
      expect(headerCell.style.width).toBe('350px');
    });

    test('drags start from the numeric meta width instead of the TanStack default', () => {
      const { container } = render(
        <DataTable
          data={members}
          enableColumnResizing
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              meta: { width: 120 },
            },
          ]}
        />,
      );

      const { headerCell, resizer } = getFirstHeaderCellAndResizer(container);

      fireEvent.mouseDown(resizer, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 130 });
      fireEvent.mouseUp(document, { clientX: 130 });

      expect(headerCell.style.width).toBe('150px');
    });

    test('renders no separators when resizing is not enabled', () => {
      const { container } = render(<DataTable data={members} />);

      expect(container.querySelector('.DataTable-columnResizer')).toBeNull();
    });

    test('a large initial column width grows the table instead of shrinking its neighbors', () => {
      const { container } = render(
        <DataTable
          data={members}
          enableColumnResizing
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              meta: { width: 800 },
            },
            {
              id: 'role',
              accessorFn: (row) => row.role,
              header: 'Role',
            },
            {
              id: 'mfaEnabled',
              accessorFn: (row) => row.mfaEnabled,
              header: 'MFA',
            },
          ]}
        />,
      );

      const table = container.querySelector<HTMLTableElement>(
        'table[aria-label="data table"]',
      );

      // The table is sized to the sum of the column widths (800 + the 150px
      // TanStack default for the two unsized columns), with a 100% floor —
      // so the wide column adds horizontal scroll rather than reflowing.
      expect(table?.style.width).toBe('max(1100px, 100%)');

      const headerCells =
        container.querySelectorAll<HTMLTableCellElement>('thead th');

      // The sized column gets its explicit width...
      expect(headerCells[0].style.width).toBe('800px');
      // ...while the unsized neighbors stay auto (no inline width) so they
      // flex to fill the remaining space instead of being crushed.
      expect(headerCells[1].style.width).toBe('');
      expect(headerCells[2].style.width).toBe('');
    });

    test('leaves the table unsized when no column carries an explicit width', () => {
      const { container } = render(
        <DataTable data={members} enableColumnResizing />,
      );

      const table = container.querySelector<HTMLTableElement>(
        'table[aria-label="data table"]',
      );

      // No explicit sizes and no drag yet — the table keeps its default
      // sizing so columns distribute normally.
      expect(table?.style.width).toBe('');
    });

    test('does not add an inline width for a numeric meta.width when resizing is off', () => {
      const { container } = render(
        <DataTable
          data={members}
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              meta: { width: 140 },
            },
          ]}
        />,
      );

      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');

      // Without resizing the size isn't seeded from meta.width, so an inline
      // width would be the 150px default and override the sx width — the
      // width must come through sx (no inline width) instead.
      expect(headerCell?.style.width).toBe('');
    });
  });

  describe('column pinning', () => {
    test('shows pin actions in the column menu only when pinning is enabled', () => {
      const { getByLabelText, queryByText } = render(
        <DataTable data={members} enableColumnMenu />,
      );

      fireEvent.click(getByLabelText('Email column menu'));

      expect(queryByText('Pin to left')).toBeNull();
      expect(queryByText('Pin to right')).toBeNull();
    });

    test('pinning a column to the left moves it to the front and makes it sticky', () => {
      const { getByLabelText, getByText, container } = render(
        <DataTable
          data={members}
          enableColumnMenu
          enableColumnPinning
          pinFirstColumn={false}
        />,
      );

      expect(getHeaderTexts(container)[0]).toBe('Email');

      fireEvent.click(getByLabelText('Role column menu'));
      fireEvent.click(getByText('Pin to left'));

      expect(getHeaderTexts(container)[0]).toBe('Role');

      // The sticky offset is inlined on the header and body cells.
      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');
      expect(headerCell?.style.left).toBe('0px');

      const firstBodyCell = container.querySelector<HTMLTableCellElement>(
        'tbody tr[data-index] td',
      );
      expect(firstBodyCell?.textContent).toBe('admin');
      expect(firstBodyCell?.style.left).toBe('0px');
    });

    test('pinning a column to the right moves it to the end', () => {
      const { getByLabelText, getByText, container } = render(
        <DataTable data={members} enableColumnMenu enableColumnPinning />,
      );

      fireEvent.click(getByLabelText('Role column menu'));
      fireEvent.click(getByText('Pin to right'));

      const headerTexts = getHeaderTexts(container);
      expect(headerTexts[headerTexts.length - 1]).toBe('Role');

      const headerCells =
        container.querySelectorAll<HTMLTableCellElement>('thead th');
      expect(headerCells[headerCells.length - 1].style.right).toBe('0px');
    });

    test('a pinned column offers the other side and Unpin, which restores the order', () => {
      const { getByLabelText, getByText, queryByText, container } = render(
        <DataTable
          data={members}
          enableColumnMenu
          enableColumnPinning
          initialColumnPinning={{ left: ['role'], right: [] }}
        />,
      );

      expect(getHeaderTexts(container)[0]).toBe('Role');

      fireEvent.click(getByLabelText('Role column menu'));
      expect(queryByText('Pin to left')).toBeNull();
      expect(getByText('Pin to right')).toBeDefined();

      fireEvent.click(getByText('Unpin'));

      expect(getHeaderTexts(container)[0]).toBe('Email');

      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');
      expect(headerCell?.style.left).toBe('');
    });

    test('reports the next pinning state and supports per-column opt-out', () => {
      const onColumnPinningChange = vi.fn();
      const { getByLabelText, getByText, queryByText } = render(
        <DataTable
          data={members}
          enableColumnMenu
          enableColumnPinning
          // Isolate explicit menu-pinning from the default first-column pin.
          pinFirstColumn={false}
          onColumnPinningChange={onColumnPinningChange}
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              enablePinning: false,
            },
            { id: 'role', accessorFn: (row) => row.role, header: 'Role' },
          ]}
        />,
      );

      // Opted-out column: no pin actions in its menu.
      fireEvent.click(getByLabelText('Email column menu'));
      expect(queryByText('Pin to left')).toBeNull();

      // Swap to the role menu (fireEvent dispatches through the backdrop).
      fireEvent.click(getByLabelText('Role column menu'));
      fireEvent.click(getByText('Pin to left'));

      expect(onColumnPinningChange).toHaveBeenCalledWith({
        left: ['role'],
        right: [],
      });
    });

    test('pins the first column to the left by default (pinFirstColumn)', () => {
      const { container } = render(
        <DataTable
          data={members}
          columns={[
            { id: 'email', accessorFn: (row) => row.email, header: 'Email' },
            { id: 'role', accessorFn: (row) => row.role, header: 'Role' },
          ]}
        />,
      );

      // First column is sticky-pinned to the left (offset inlined on header + body cells), even
      // without enableColumnPinning (which only governs the menu pin actions).
      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');
      expect(headerCell?.style.left).toBe('0px');
      const firstBodyCell = container.querySelector<HTMLTableCellElement>(
        'tbody tr[data-index] td',
      );
      expect(firstBodyCell?.style.left).toBe('0px');
    });

    test('pinFirstColumn={false} leaves the first column unpinned', () => {
      const { container } = render(
        <DataTable
          data={members}
          pinFirstColumn={false}
          columns={[
            { id: 'email', accessorFn: (row) => row.email, header: 'Email' },
            { id: 'role', accessorFn: (row) => row.role, header: 'Role' },
          ]}
        />,
      );

      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');
      expect(headerCell?.style.left).toBe('');
    });

    test('the default first-column pin skips a column that opted out of pinning', () => {
      const { container } = render(
        <DataTable
          data={members}
          columns={[
            {
              id: 'email',
              accessorFn: (row) => row.email,
              header: 'Email',
              enablePinning: false,
            },
          ]}
        />,
      );

      // The only column opted out, nothing is auto-pinned.
      const headerCell =
        container.querySelector<HTMLTableCellElement>('thead th');
      expect(headerCell?.style.left).toBe('');
    });
  });

  describe('custom icons', () => {
    // Icon slots receive SvgIcon props (fontSize, sx) which custom
    // components are free to ignore.
    function makeIcon(testId: string) {
      return function TestIcon() {
        return <svg data-testid={testId} />;
      };
    }

    test('replaces the toolbar, header and pagination icons', () => {
      const { getAllByTestId, getByTestId, queryByTestId } = render(
        <DataTable
          data={members}
          showToolbar
          enableColumnMenu
          initialSorting={[{ id: 'email', desc: false }]}
          icons={{
            sort: makeIcon('custom-sort'),
            columnMenu: makeIcon('custom-column-menu'),
            openFilterPanel: makeIcon('custom-open-filter-panel'),
            manageColumns: makeIcon('custom-manage-columns'),
            search: makeIcon('custom-search'),
            paginationFirst: makeIcon('custom-pagination-first'),
            paginationPrevious: makeIcon('custom-pagination-previous'),
            paginationNext: makeIcon('custom-pagination-next'),
            paginationLast: makeIcon('custom-pagination-last'),
          }}
        />,
      );

      // One sort arrow per sortable header (inferred columns all sort).
      expect(getAllByTestId('custom-sort')).toHaveLength(3);
      expect(getByTestId('custom-open-filter-panel')).toBeDefined();
      expect(getByTestId('custom-manage-columns')).toBeDefined();
      expect(getByTestId('custom-search')).toBeDefined();
      expect(getByTestId('custom-pagination-first')).toBeDefined();
      expect(getByTestId('custom-pagination-previous')).toBeDefined();
      expect(getByTestId('custom-pagination-next')).toBeDefined();
      expect(getByTestId('custom-pagination-last')).toBeDefined();
      // One kebab per leaf header.
      expect(getAllByTestId('custom-column-menu')).toHaveLength(3);

      // The MUI defaults are gone (MUI icons carry a `<Name>Icon` testid).
      expect(queryByTestId('FilterListIcon')).toBeNull();
      expect(queryByTestId('ViewColumnIcon')).toBeNull();
      expect(queryByTestId('SearchIcon')).toBeNull();
      expect(queryByTestId('MoreVertIcon')).toBeNull();
      expect(queryByTestId('FirstPageIcon')).toBeNull();
      expect(queryByTestId('KeyboardArrowLeftIcon')).toBeNull();
      expect(queryByTestId('KeyboardArrowRightIcon')).toBeNull();
      expect(queryByTestId('LastPageIcon')).toBeNull();
    });

    test('replaces the column menu and filter panel icons', () => {
      const { getByLabelText, getByText, getByTestId, queryByTestId } = render(
        <DataTable
          data={members}
          enableColumnMenu
          enableColumnPinning
          pinFirstColumn={false}
          icons={{
            sortAsc: makeIcon('custom-sort-asc'),
            sortDesc: makeIcon('custom-sort-desc'),
            pinLeft: makeIcon('custom-pin-left'),
            pinRight: makeIcon('custom-pin-right'),
            filter: makeIcon('custom-filter'),
            hideColumn: makeIcon('custom-hide-column'),
            manageColumns: makeIcon('custom-manage-columns'),
            close: makeIcon('custom-close'),
            addFilter: makeIcon('custom-add-filter'),
            removeAllFilters: makeIcon('custom-remove-all-filters'),
          }}
        />,
      );

      fireEvent.click(getByLabelText('Email column menu'));

      expect(getByTestId('custom-sort-asc')).toBeDefined();
      expect(getByTestId('custom-sort-desc')).toBeDefined();
      expect(getByTestId('custom-pin-left')).toBeDefined();
      expect(getByTestId('custom-pin-right')).toBeDefined();
      expect(getByTestId('custom-filter')).toBeDefined();
      expect(getByTestId('custom-hide-column')).toBeDefined();
      expect(getByTestId('custom-manage-columns')).toBeDefined();
      expect(queryByTestId('ArrowUpwardIcon')).toBeNull();
      expect(queryByTestId('PushPinIcon')).toBeNull();
      expect(queryByTestId('FilterAltIcon')).toBeNull();
      expect(queryByTestId('VisibilityOffIcon')).toBeNull();

      // Swap the menu for the filter panel, which opens with one row.
      fireEvent.click(getByText('Filter'));

      expect(getByTestId('custom-close')).toBeDefined();
      expect(getByTestId('custom-add-filter')).toBeDefined();
      expect(getByTestId('custom-remove-all-filters')).toBeDefined();
      expect(queryByTestId('CloseIcon')).toBeNull();
      expect(queryByTestId('AddIcon')).toBeNull();
      expect(queryByTestId('DeleteOutlineIcon')).toBeNull();
    });

    test('keeps the MUI defaults for unset slots', () => {
      const { getByTestId } = render(
        <DataTable
          data={members}
          showToolbar
          icons={{ search: makeIcon('custom-search') }}
        />,
      );

      expect(getByTestId('custom-search')).toBeDefined();
      expect(getByTestId('ViewColumnIcon')).toBeDefined();
      expect(getByTestId('FilterListIcon')).toBeDefined();
    });
  });

  describe('bidirectional scroll', () => {
    function getScrollContainer(container: HTMLElement): HTMLDivElement {
      return container.querySelector(
        '.MuiTableContainer-root',
      ) as HTMLDivElement;
    }

    // jsdom has no layout — fake a scrollable container so the hook's edge
    // math (scrollHeight - scrollTop - clientHeight) has real numbers.
    function makeScrollable(element: HTMLDivElement): void {
      Object.defineProperty(element, 'scrollHeight', {
        value: 1000,
        configurable: true,
      });
      Object.defineProperty(element, 'clientHeight', {
        value: 400,
        configurable: true,
      });
    }

    test('shows the sticky in-flight indicators while pages load', () => {
      const { getByText } = render(
        <DataTable
          data={members}
          disablePagination
          bidirectionalScroll={{
            isLoadingNewer: true,
            isLoadingOlder: true,
            onLoadNewer: vi.fn(),
            onLoadOlder: vi.fn(),
          }}
        />,
      );

      expect(getByText('Loading newer rows')).toBeDefined();
      expect(getByText('Loading older rows')).toBeDefined();
    });

    test('supports custom indicator labels', () => {
      const { getByText } = render(
        <DataTable
          data={members}
          disablePagination
          bidirectionalScroll={{
            isLoadingNewer: true,
            isLoadingOlder: true,
            onLoadNewer: vi.fn(),
            onLoadOlder: vi.fn(),
            loadingNewerLabel: 'Loading newer logs',
            loadingOlderLabel: 'Loading older logs',
          }}
        />,
      );

      expect(getByText('Loading newer logs')).toBeDefined();
      expect(getByText('Loading older logs')).toBeDefined();
    });

    test('hides the indicators while no page is loading', () => {
      const { queryByText } = render(
        <DataTable
          data={members}
          disablePagination
          bidirectionalScroll={{
            onLoadNewer: vi.fn(),
            onLoadOlder: vi.fn(),
          }}
        />,
      );

      expect(queryByText('Loading newer rows')).toBeNull();
      expect(queryByText('Loading older rows')).toBeNull();
    });

    test('loads newer rows at the top edge and older rows at the bottom edge', () => {
      const onLoadNewer = vi.fn();
      const onLoadOlder = vi.fn();

      const { container } = render(
        <DataTable
          data={members}
          disablePagination
          bidirectionalScroll={{
            hasNewer: true,
            hasOlder: true,
            onLoadNewer,
            onLoadOlder,
          }}
        />,
      );

      const scrollContainer = getScrollContainer(container);
      makeScrollable(scrollContainer);

      // Scroll away from both edges to arm the triggers.
      scrollContainer.scrollTop = 300;
      fireEvent.scroll(scrollContainer);
      expect(onLoadNewer).not.toHaveBeenCalled();
      expect(onLoadOlder).not.toHaveBeenCalled();

      // Top edge — loads newer.
      scrollContainer.scrollTop = 0;
      fireEvent.scroll(scrollContainer);
      expect(onLoadNewer).toHaveBeenCalledTimes(1);

      // Bottom edge (scrollHeight - scrollTop - clientHeight = 0) — loads
      // older.
      scrollContainer.scrollTop = 600;
      fireEvent.scroll(scrollContainer);
      expect(onLoadOlder).toHaveBeenCalledTimes(1);
    });

    test('does not load at the edges without the bidirectionalScroll prop', () => {
      const { container } = render(
        <DataTable data={members} disablePagination />,
      );

      const scrollContainer = getScrollContainer(container);
      makeScrollable(scrollContainer);

      scrollContainer.scrollTop = 300;
      fireEvent.scroll(scrollContainer);
      scrollContainer.scrollTop = 0;

      // No listener is attached, so this must not throw — and there are no
      // callbacks to call.
      fireEvent.scroll(scrollContainer);
    });

    test('preserves the scroll position when newer rows are prepended', () => {
      const newer: Member[] = [
        { email: 'delta@verified.inc', role: 'member', mfaEnabled: true },
        { email: 'echo@verified.inc', role: 'admin', mfaEnabled: false },
      ];

      const renderTable = (data: Member[], isLoadingNewer: boolean) => (
        <DataTable
          data={data}
          getRowId={(row) => row.email}
          disablePagination
          bidirectionalScroll={{
            hasNewer: true,
            isLoadingNewer,
            onLoadNewer: vi.fn(),
            onLoadOlder: vi.fn(),
          }}
        />
      );

      const { container, rerender } = render(renderTable(members, false));

      const scrollContainer = getScrollContainer(container);
      makeScrollable(scrollContainer);
      scrollContainer.scrollTop = 100;

      // The fetch starts — the hook snapshots the scroll metrics.
      rerender(renderTable(members, true));

      // The fetched rows land, growing the scrollable height by 400.
      Object.defineProperty(scrollContainer, 'scrollHeight', {
        value: 1400,
        configurable: true,
      });
      rerender(renderTable([...newer, ...members], false));

      // scrollTop is pushed down by the height delta, holding the viewport.
      expect(scrollContainer.scrollTop).toBe(500);
    });
  });
});

describe('dataTableFilterFn', () => {
  // Only getValue is read by the filter function.
  function rowWith(value: unknown): Row<unknown> {
    return { getValue: () => value } as unknown as Row<unknown>;
  }

  test.each<
    [DataTableFilterOperator, unknown, string | string[] | undefined, boolean]
  >([
    // Comparisons are case-insensitive over the stringified value.
    ['contains', 'Alpha@Verified.inc', 'alpha', true],
    ['contains', 'bravo', 'alpha', false],
    // Multiple contains values (chips) OR within the row.
    ['contains', 'alpha@verified.inc', ['ZULU', 'Alpha'], true],
    ['contains', 'bravo', ['alpha', 'zulu'], false],
    ['contains', 'anything', [], true],
    ['doesNotContain', 'bravo', 'alpha', true],
    ['equals', 'Admin', 'admin', true],
    ['doesNotEqual', 'admin', 'admin', false],
    ['startsWith', 'alpha@verified.inc', 'ALPHA', true],
    ['endsWith', 'alpha@verified.inc', '.inc', true],
    ['endsWith', 'alpha@verified.inc', 'alpha', false],
    ['isEmpty', null, undefined, true],
    ['isEmpty', '', undefined, true],
    ['isEmpty', 'x', undefined, false],
    ['isNotEmpty', '', undefined, false],
    ['isNotEmpty', 0, undefined, true],
    ['isAnyOf', 'admin', ['member', 'Admin'], true],
    ['isAnyOf', 'owner', ['member', 'admin'], false],
    // Filters without a usable value match every row.
    ['contains', 'anything', '', true],
    ['contains', 'anything', '   ', true],
    ['isAnyOf', 'anything', [], true],
  ])('%s on %j with %j → %s', (operator, raw, value, expected) => {
    expect(dataTableFilterFn(rowWith(raw), 'column', { operator, value })).toBe(
      expected,
    );
  });
});

describe('field filter panel (filterFields)', () => {
  const roleField: DataTableFilterField = {
    id: 'role',
    label: 'Role',
    kind: 'multiSelect',
    columnId: 'role',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Member', value: 'member' },
    ],
  };

  const emailField: DataTableFilterField = {
    id: 'email',
    label: 'Email',
    kind: 'text',
    columnId: 'email',
    operators: ['contains', 'startsWith'],
  };

  const billableField: DataTableFilterField = {
    id: 'mfaEnabled',
    label: 'MFA',
    kind: 'boolean',
    columnId: 'mfaEnabled',
  };

  test('opens the built-in field panel (not the operator panel) from the toolbar', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <DataTable
        data={members}
        showToolbar
        filterFields={[emailField, roleField]}
      />,
    );

    fireEvent.click(getByLabelText('Show filters'));

    // Field labels render; the operator panel's "Add filter" does not.
    expect(getByText('Clear all')).toBeDefined();
    expect(queryByText('Add filter')).toBeNull();
  });

  test('filters rows client-side from a text field value', () => {
    const filterState: DataTableFilterState = {
      email: { kind: 'text', operator: 'contains', value: 'alpha' },
    };
    const { container } = render(
      <DataTable
        data={members}
        filterFields={[emailField]}
        filterState={filterState}
      />,
    );

    const rows = getBodyRowTexts(container);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toContain('alpha@verified.inc');
  });

  test('filters rows client-side from a multiSelect keyed by value', () => {
    const filterState: DataTableFilterState = {
      role: { kind: 'multiSelect', values: ['admin'] },
    };
    const { container } = render(
      <DataTable
        data={members}
        filterFields={[roleField]}
        filterState={filterState}
      />,
    );

    const rows = getBodyRowTexts(container);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toContain('charlie@verified.inc');
  });

  test('badge counts active fields; select-all clears', () => {
    const { getByLabelText, rerender } = render(
      <DataTable
        data={members}
        showToolbar
        filterFields={[emailField, roleField]}
        filterState={{
          email: { kind: 'text', operator: 'contains', value: 'a' },
          role: { kind: 'multiSelect', values: ['admin'] },
        }}
      />,
    );

    expect(getByLabelText('Show filters').textContent).toBe('2');

    // Fully-selecting every option of a multiSelect clears it (no filter),
    // dropping the badge to just the active text field.
    rerender(
      <DataTable
        data={members}
        showToolbar
        filterFields={[emailField, roleField]}
        filterState={{
          email: { kind: 'text', operator: 'contains', value: 'a' },
          role: { kind: 'multiSelect', values: ['admin', 'member'] },
        }}
      />,
    );

    expect(getByLabelText('Show filters').textContent).toBe('1');
  });

  test('reports state changes in server-value terms from a text field', () => {
    const onFilterStateChange = vi.fn();
    const { getByLabelText } = render(
      <DataTable
        data={members}
        showToolbar
        manualFiltering
        filterFields={[emailField]}
        filterState={{
          email: { kind: 'text', operator: 'contains', value: '' },
        }}
        onFilterStateChange={onFilterStateChange}
      />,
    );

    fireEvent.click(getByLabelText('Show filters'));
    fireEvent.change(getByLabelText('Email'), { target: { value: 'bravo' } });

    expect(onFilterStateChange).toHaveBeenCalledWith({
      email: { kind: 'text', operator: 'contains', value: 'bravo' },
    });
  });

  test('renders a boolean field as a clearable Yes/No single-select', () => {
    const { getByLabelText, getAllByRole } = render(
      <DataTable data={members} showToolbar filterFields={[billableField]} />,
    );

    fireEvent.click(getByLabelText('Show filters'));
    // Open the Autocomplete popup (arrow keydown reveals the options).
    fireEvent.keyDown(getByLabelText('MFA'), { key: 'ArrowDown' });

    const options = getAllByRole('option').map((option) => option.textContent);
    expect(options).toEqual(['Yes', 'No']);
  });

  test('multiSelect finds an option by its value (e.g. a pasted uuid)', () => {
    // Duplicate display names, distinct values, the option must be findable by
    // value so a specific item can be targeted despite the shared name.
    const tagsField: DataTableFilterField = {
      id: 'tags',
      label: 'Tags',
      kind: 'multiSelect',
      options: [
        { label: 'Health', value: 'uuid-a' },
        { label: 'Health', value: 'uuid-b' },
        { label: 'Finance', value: 'uuid-c' },
      ],
    };
    const { getByLabelText, getAllByRole } = render(
      <DataTable data={members} showToolbar filterFields={[tagsField]} />,
    );

    fireEvent.click(getByLabelText('Show filters'));
    const input = getByLabelText('Tags');
    fireEvent.mouseDown(input);
    input.focus();
    fireEvent.change(input, { target: { value: 'uuid-b' } });

    // Only the option whose value matches shows (not the other Health, Finance,
    // or the "Select all" row).
    const options = getAllByRole('option').map((option) => option.textContent);
    expect(options).toEqual(['Health']);
  });
});
