import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import type { PaginationState, SortingState } from '@tanstack/react-table';
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Badge, ChevronLeft, ChevronRight, Close } from '@mui/icons-material';

import { formatExtendedDate } from '../../utils/date';

import { DataTable } from '../../components/DataTable';
import type { DataTableRowContext } from '../../components/DataTable';
import { set } from 'date-fns';

type Member = {
  email: string;
  role: string;
  mfaEnabled: boolean;
  status: string;
  custom: { abc: number };
  invitedAt: string;
};

const roles = ['admin', 'member'];
const statuses = ['accepted', 'pending', 'expired'];

const members: Member[] = Array.from({ length: 137 }, (_, index) => ({
  email: `user${String(index + 1).padStart(3, '0')}@verified.inc`,
  role: roles[index % roles.length],
  mfaEnabled: index % 3 === 0,
  status: statuses[index % statuses.length],
  custom: {
    abc: 123,
  },
  invitedAt: new Date(Date.UTC(2026, index % 12, (index % 27) + 1))
    .toISOString()
    .slice(0, 10),
}));

const meta: Meta<typeof DataTable<Member>> = {
  title: 'Components/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable<Member>>;

// Columns inferred from the keys of the first row — no column config needed.
export const Default: Story = {
  args: {
    data: members,
  },
};

// Custom TanStack column definitions with per-column meta (align/width).
// Sorting is opt-in: only columns declaring `enableSorting: true` get a
// sort header (here email and MFA — role and status are plain labels).
export const CustomColumns: Story = {
  args: {
    data: members,
    initialSorting: [{ id: 'email', desc: false }],
    columns: [
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: 'Email',
        enableSorting: true,
      },
      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: 'Role',
        cell: (info) => (
          <Box sx={{ textTransform: 'capitalize' }}>
            {String(info.getValue())}
          </Box>
        ),
        meta: { width: 140 },
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: 'Status',
        cell: (info) => (
          <Chip
            size='small'
            label={String(info.getValue())}
            color={info.getValue() === 'accepted' ? 'success' : 'default'}
            sx={{ textTransform: 'capitalize' }}
          />
        ),
        meta: { width: 140 },
      },
      {
        id: 'mfaEnabled',
        accessorFn: (row) => row.mfaEnabled,
        header: 'MFA',
        cell: (info) => (info.getValue() ? 'Enabled' : 'Not Enabled'),
        enableSorting: true,
        meta: { align: 'right', width: 140 },
      },
    ],
  },
};

// Sorting disabled table-wide — headers are plain labels and rows keep the
// order of `data`, like the dashboard LogsTable. (With custom columns,
// sorting is already opt-in per column via `enableSorting: true`; this
// prop force-disables it even for columns that declare it.)
export const NotSortable: Story = {
  args: {
    data: members,
    disableSorting: true,
  },
};

// Grouped columns (TanStack group defs) — renders a two-row header where
// ungrouped columns span both rows and group labels sit centered above
// their sub-columns, like the mission control BillableEventsTable.
export const GroupedColumns: Story = {
  args: {
    data: members,
    initialSorting: [{ id: 'email', desc: false }],
    columns: [
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: 'Email',
        enableSorting: true,
      },
      {
        id: 'account',
        header: 'Account',
        columns: [
          {
            id: 'role',
            accessorFn: (row) => row.role,
            header: 'Role',
            cell: (info) => (
              <Box sx={{ textTransform: 'capitalize' }}>
                {String(info.getValue())}
              </Box>
            ),
          },
          {
            id: 'invitedAt',
            accessorFn: (row) => row.invitedAt,
            header: 'Invited At',
            enableSorting: true,
          },
        ],
      },
      {
        id: 'security',
        header: 'Security',
        columns: [
          {
            id: 'status',
            accessorFn: (row) => row.status,
            header: 'Status',
            cell: (info) => (
              <Chip
                size='small'
                label={String(info.getValue())}
                color={info.getValue() === 'accepted' ? 'success' : 'default'}
                sx={{ textTransform: 'capitalize' }}
              />
            ),
          },
          {
            id: 'mfaEnabled',
            accessorFn: (row) => row.mfaEnabled,
            header: 'MFA',
            cell: (info) => (info.getValue() ? 'Enabled' : 'Not Enabled'),
            meta: { align: 'right' },
          },
        ],
      },
    ],
  },
};

// Fully custom rows (expandable, like the dashboard team table) while keeping
// sorting, pagination and virtualization from the table. Expansion state is
// stored in the table (keyed by row id), so it survives sorting, page changes
// and virtualization unmounts.
function ExpandableRow({ row, rowProps }: DataTableRowContext<Member>) {
  const open = row.getIsExpanded();

  return (
    <>
      <TableRow
        {...rowProps}
        hover
        sx={{ '& > td': { borderBottom: 'unset' } }}
      >
        <TableCell sx={{ width: 10 }}>
          <IconButton onClick={row.getToggleExpandedHandler()}>
            {open ? (
              <ChevronLeft sx={{ transform: 'rotate(90deg)' }} />
            ) : (
              <ChevronRight />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{row.original.email}</TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>
          {row.original.role}
        </TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>
          {row.original.status}
        </TableCell>
        <TableCell>{row.original.custom.abc}</TableCell>
      </TableRow>
      {/* Divider row — also hosts the expanded content above the line. */}
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ pl: 8, mb: 1 }}>
              <Button variant='text' startIcon={<Close />}>
                Remove
              </Button>
              <Button variant='text' startIcon={<Badge />}>
                Change Role
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export const CustomRows: Story = {
  args: {
    data: members,
    // Stable row ids keep the expansion state attached to the right row
    // across sorting and pagination.
    getRowId: (row) => row.email,
    // Percentage widths split the remaining space between columns,
    // like the dashboard team table layout.
    columns: [
      // Display-only column for the expand chevron (not sortable).
      { id: 'expand', header: '', meta: { width: 10 } },
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: 'Email',
        enableSorting: true,
        meta: { width: '50%' },
      },
      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: 'Role',
        enableSorting: true,
        meta: { width: '25%' },
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: 'Status',
        enableSorting: true,
        meta: { width: '25%' },
      },
      {
        id: 'custom',
        accessorFn: (row) => row.custom.abc,
        header: 'Custom',
        meta: { align: 'left', width: '25%' },
      },
    ],
    renderRow: (context) => <ExpandableRow {...context} />,
  },
};

// Custom content on the left side of the footer, opposite the pagination
// controls (e.g. a summary or bulk actions).
export const FooterLeftContent: Story = {
  args: {
    data: members,
    footerLeft: (
      <Typography variant='caption' color='text.secondary' fontWeight='600'>
        The data was last updated on{' '}
        {formatExtendedDate(Date.now(), {
          hour12: false,
        })}
        .
      </Typography>
    ),
  },
};

// Server-side pagination and sorting — `data` holds only the current page,
// `rowCount` is the server total, and pagination/sorting state lives in the
// consumer so a query (e.g. React Query keyed on both) fetches each page.
// Previous rows stay visible while the next page loads, like
// keepPreviousData; the pager and sort headers are disabled meanwhile.
function AsyncPaginationExample() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    // Simulates a server request for one sorted page of rows.
    const timeout = setTimeout(() => {
      const sorted = [...members];
      const [sort] = sorting;

      if (sort) {
        sorted.sort((a, b) => {
          const left = String(a[sort.id as keyof Member]);
          const right = String(b[sort.id as keyof Member]);

          return sort.desc
            ? right.localeCompare(left)
            : left.localeCompare(right);
        });
      }

      const start = pagination.pageIndex * pagination.pageSize;
      setPage(sorted.slice(start, start + pagination.pageSize));
      setTotal(members.length);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [pagination, sorting]);

  return (
    <Box sx={{ opacity: isLoading ? 0.5 : 1 }}>
      <DataTable
        data={page}
        columns={[
          {
            id: 'email',
            accessorFn: (row) => row.email,
            header: 'Email',
            enableSorting: true,
            meta: { width: '50%' },
          },
          {
            id: 'role',
            accessorFn: (row) => row.role,
            header: 'Role',
            enableSorting: true,
            meta: { width: '25%' },
          },
          {
            id: 'status',
            accessorFn: (row) => row.status,
            header: 'Status',
            enableSorting: true,
            meta: { width: '25%' },
          },
        ]}
        isLoading={isLoading}
        manualPagination
        manualSorting
        rowCount={total}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={(next) => {
          setSorting(next);
          // A server-side sort reorders the whole dataset — jump back
          // to the first page.
          setPagination((previous) => ({ ...previous, pageIndex: 0 }));
        }}
        renderLoading={() => (
          <>
            {Array.from({ length: 5 }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 3 }, (_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton variant='text' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </>
        )}
      />
    </Box>
  );
}

export const AsyncPagination: Story = {
  render: () => <AsyncPaginationExample />,
};

// Large dataset with pagination disabled — virtualization keeps it fast.
export const VirtualizedWithoutPagination: Story = {
  args: {
    data: Array.from({ length: 5000 }, (_, index) => ({
      email: `user${index}@verified.inc`,
      role: roles[index % roles.length],
      mfaEnabled: index % 3 === 0,
      status: statuses[index % statuses.length],
      custom: { abc: 123 },
      invitedAt: '2026-01-01',
    })),
    disablePagination: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: 'No member found, add someone to the team!',
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

// Custom loading state — skeleton rows, like the dashboard
// LoadingTableSkeleton.
export const CustomLoading: Story = {
  args: {
    data: [],
    isLoading: true,
    columns: [
      { id: 'email', accessorFn: (row) => row.email, header: 'Email' },
      { id: 'role', accessorFn: (row) => row.role, header: 'Role' },
      { id: 'status', accessorFn: (row) => row.status, header: 'Status' },
    ],
    renderLoading: () => (
      <>
        {Array.from({ length: 5 }, (_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: 3 }, (_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton variant='text' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    ),
  },
};
