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
import {
  AddCircleOutline,
  ArrowBack,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowForward,
  Badge,
  ChevronLeft,
  ChevronRight,
  Close,
  DeleteSweep,
  FilterAltOutlined,
  HighlightOff,
  ManageSearch,
  MoreHoriz,
  North,
  RemoveCircleOutline,
  SkipNext,
  SkipPrevious,
  South,
  Tune,
  UnfoldMore,
  ViewWeek,
  VisibilityOffOutlined,
} from '@mui/icons-material';

import { formatExtendedDate } from '../../utils/date';

import { DataTable } from '../../components/DataTable';
import type { DataTableRowContext } from '../../components/DataTable';

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

// Drag the vertical separators on the header edges to resize columns;
// double-click a separator to restore the default width. `tableLayout:
// 'fixed'` makes the dragged widths exact (with 'auto', content can keep a
// column from shrinking below its natural width).
export const ColumnResizing: Story = {
  args: {
    data: members,
    enableColumnResizing: true,
    tableLayout: 'fixed',
    columns: [
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: 'Email',
        enableSorting: true,
        meta: { width: 280 },
      },
      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: 'Role',
        meta: { width: 160 },
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: 'Status',
        meta: { width: 160 },
      },
      {
        id: 'invitedAt',
        accessorFn: (row) => row.invitedAt,
        header: 'Invited At',
        enableSorting: true,
      },
    ],
  },
};

// A large initial column width (set via `meta.width`) behaves like a
// drag-resize: the table grows to the sum of the column widths and scrolls
// horizontally, instead of shrinking the other columns to fit. Columns
// without a width stay auto and flex to fill the remaining space.
export const LargeColumnWidth: Story = {
  args: {
    data: members,
    enableColumnResizing: true,
    columns: [
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: 'Email',
        enableSorting: true,
        meta: { width: 2000 },
      },
      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: 'Role',
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: 'Status',
      },
      {
        id: 'invitedAt',
        accessorFn: (row) => row.invitedAt,
        header: 'Invited At',
        enableSorting: true,
      },
    ],
  },
};

// Per-column kebab menu (hover a header to reveal it), like the MUI
// DataGrid column menu: Sort by ASC/DESC for sortable columns, Filter for
// filterable columns, and Hide column / Manage columns for visibility.
export const ColumnMenu: Story = {
  args: {
    data: members,
    enableColumnMenu: true,
  },
};

// Top-right toolbar with Manage columns and Filters buttons plus a search
// button that expands into a quick-search input, like the MUI DataGrid
// toolbar. The panels open anchored to their toolbar button — including
// when triggered from a column menu — and the filter button shows a badge
// with the active filter count. The quick search matches any column value
// (with `manualFiltering`, the query feeds a server query via
// `onSearchChange` instead).
export const Toolbar: Story = {
  args: {
    data: members,
    showToolbar: true,
    enableColumnMenu: true,
  },
};

// Table mounted with an active quick search — the input starts expanded
// with the query applied and collapses back to its icon once cleared.
export const ToolbarInitialSearch: Story = {
  args: {
    data: members,
    showToolbar: true,
    initialSearch: 'admin',
  },
};

// Columns hidden on mount — bring them back through the column menu's
// Manage columns panel (or hide more via Hide column). The panel's Reset
// restores this initial visibility.
export const InitialColumnVisibility: Story = {
  args: {
    data: members,
    enableColumnMenu: true,
    initialColumnVisibility: { custom: false, invitedAt: false },
  },
};

// Pin columns to either edge from the column menu (Pin to left / Pin to
// right / Unpin) — pinned columns reorder to that edge and stay sticky
// while the table scrolls horizontally. Email starts pinned left. The
// `minWidth` beyond the container width is what makes the table scroll
// horizontally — without it there is nothing for pinned columns to
// stick over.
export const ColumnPinning: Story = {
  args: {
    data: members,
    enableColumnMenu: true,
    enableColumnPinning: true,
    minWidth: 1600,
    initialColumnPinning: { left: ['email'], right: [] },
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
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: 'Status',
      },
      {
        id: 'mfaEnabled',
        accessorFn: (row) => row.mfaEnabled,
        header: 'MFA',
        cell: (info) => (info.getValue() ? 'Enabled' : 'Not Enabled'),
      },
      {
        id: 'invitedAt',
        accessorFn: (row) => row.invitedAt,
        header: 'Invited At',
      },
    ],
  },
};

// Declarative filter-field spec: the toolbar Filters button opens the built-in panel rendering one
// control per field (multiSelect / text / boolean here) from `filterFields`. The table owns the UI
// and derives the badge itself. Client-side here (no `manualFiltering`) so the controls filter the
// rows live, a real consumer pairs `manualFiltering` with `onFilterStateChange` mapping the
// server-value state to its query. Option `value`s carry the server value (so they can differ from
// the label, e.g. a uuid).
export const DeclarativeFilters: Story = {
  args: {
    data: members,
    showToolbar: true,
    filterFields: [
      {
        id: 'role',
        label: 'Role',
        kind: 'multiSelect',
        columnId: 'role',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Member', value: 'member' },
        ],
      },
      {
        id: 'status',
        label: 'Status',
        kind: 'multiSelect',
        columnId: 'status',
        options: [
          { label: 'Accepted', value: 'accepted' },
          { label: 'Pending', value: 'pending' },
          { label: 'Expired', value: 'expired' },
        ],
      },
      {
        id: 'email',
        label: 'Email',
        kind: 'text',
        columnId: 'email',
        operators: ['contains', 'startsWith', 'endsWith'],
      },
      {
        id: 'mfaEnabled',
        label: 'MFA',
        kind: 'boolean',
        columnId: 'mfaEnabled',
      },
    ],
  },
};

// A non-column ("extended") `group` field - sectioned multi-selects that map to several server
// params, with no single column to bind to. Such fields are server-only: they surface through
// `onFilterStateChange` (pair with `manualFiltering`) rather than filtering client-side. Shown
// alongside a column-bound multiSelect.
export const DeclarativeGroupFilter: Story = {
  args: {
    data: members,
    showToolbar: true,
    manualFiltering: true,
    filterFields: [
      {
        id: 'role',
        label: 'Role',
        kind: 'multiSelect',
        columnId: 'role',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Member', value: 'member' },
        ],
      },
      {
        id: 'activity',
        label: 'Activity',
        kind: 'group',
        sections: [
          {
            key: 'anyProductActivity',
            label: 'Any product',
            options: [
              { label: 'This month', value: 'this_month' },
              { label: 'Earlier', value: 'earlier' },
              { label: 'Never', value: 'never' },
            ],
          },
        ],
      },
    ],
  },
};

// Export-only columns appended after the visible columns in the CSV / Excel / Print output — for
// data shown outside the grid (e.g. ids in an expandable detail row). Open the Export menu.
export const AdditionalExportColumns: Story = {
  args: {
    data: members,
    showToolbar: true,
    enableExport: true,
    additionalExportColumns: [
      { header: 'Role (export only)', value: (row) => row.role },
      { header: 'Status (export only)', value: (row) => row.status },
    ],
  },
};

// Everything on: the toolbar, drag-resizable columns plus the full column
// menu (sort, pin, filter, hide, manage columns) and the export menu
// (print, CSV, Excel) — exports reflect the displayed rows and columns.
export const FullFeatured: Story = {
  args: {
    data: members,
    showToolbar: true,
    enableColumnMenu: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    enableExport: true,
    exportFilename: 'members',
    tableLayout: 'fixed',
  },
};

// Custom icon mapping — every icon the table renders can be replaced
// through the `icons` prop (here with other MUI icons, but any component
// accepting SvgIcon props works, e.g. icons from another library). Unset
// slots keep the MUI default.
export const CustomIcons: Story = {
  args: {
    data: members,
    showToolbar: true,
    enableColumnMenu: true,
    enableColumnPinning: true,
    initialSorting: [{ id: 'email', desc: false }],
    icons: {
      sort: UnfoldMore,
      sortAsc: North,
      sortDesc: South,
      pinLeft: ArrowCircleLeft,
      pinRight: ArrowCircleRight,
      unpin: RemoveCircleOutline,
      columnMenu: MoreHoriz,
      filter: FilterAltOutlined,
      openFilterPanel: Tune,
      manageColumns: ViewWeek,
      hideColumn: VisibilityOffOutlined,
      search: ManageSearch,
      close: HighlightOff,
      addFilter: AddCircleOutline,
      removeAllFilters: DeleteSweep,
      paginationFirst: SkipPrevious,
      paginationPrevious: ArrowBack,
      paginationNext: ArrowForward,
      paginationLast: SkipNext,
    },
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

// Bidirectional infinite scroll — rows stream in at both edges like the
// dashboard LogsTable: scrolling to the bottom fetches older rows and
// scrolling back to the top fetches newer ones, with sticky in-flight
// indicators at the edges. Pagination is disabled — the scroll edges
// replace the pager — and `getRowId` keeps row identity stable while
// newer rows are prepended.
function BidirectionalScrollExample() {
  const PAGE = 25;

  // Window into the feed: starts in the middle so both directions have
  // pages to load.
  const [start, setStart] = useState(50);
  const [end, setEnd] = useState(50 + PAGE);
  const [isLoadingNewer, setIsLoadingNewer] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);

  const loadNewer = () => {
    setIsLoadingNewer(true);

    // Simulates a server request for the next newer page.
    setTimeout(() => {
      setStart((previous) => Math.max(0, previous - PAGE));
      setIsLoadingNewer(false);
    }, 800);
  };

  const loadOlder = () => {
    setIsLoadingOlder(true);

    // Simulates a server request for the next older page.
    setTimeout(() => {
      setEnd((previous) => Math.min(members.length, previous + PAGE));
      setIsLoadingOlder(false);
    }, 800);
  };

  return (
    <DataTable
      data={members.slice(start, end)}
      getRowId={(row) => row.email}
      disablePagination
      // The feed arrives in server order — client sorting would shuffle
      // the merged pages.
      disableSorting
      maxHeight={400}
      bidirectionalScroll={{
        hasNewer: start > 0,
        hasOlder: end < members.length,
        isLoadingNewer,
        isLoadingOlder,
        onLoadNewer: loadNewer,
        onLoadOlder: loadOlder,
      }}
    />
  );
}

export const BidirectionalScroll: Story = {
  render: () => <BidirectionalScrollExample />,
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
