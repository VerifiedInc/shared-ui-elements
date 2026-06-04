import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { TableCell, TableRow } from '@mui/material';

import {
  DataTable,
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
});
