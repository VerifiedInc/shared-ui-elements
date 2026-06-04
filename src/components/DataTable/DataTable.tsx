import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnPinningPosition,
  type ColumnPinningState,
  type ColumnSizingState,
  type Header,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { SxProps, Theme } from '@mui/material';
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Close,
  FilterAlt,
  FilterList,
  MoreVert,
  Search,
  ViewColumn,
} from '@mui/icons-material';

import type {
  DataTableActiveFilters,
  DataTableData,
  DataTableIcons,
  DataTableProps,
} from './DataTable.types';
import {
  applyMetaWidthsToSizes,
  getColumnLabel,
  getColumnMeta,
  inferColumns,
} from './DataTable.utils';
import {
  applyFilters,
  applySearch,
  EMPTY_FILTERS,
  isFilterRowActive,
} from './DataTable.filters';
import { DataTableColumnMenu } from './DataTableColumnMenu';
import { DataTableFilterPanel } from './DataTableFilterPanel';
import { DataTableManageColumnsPanel } from './DataTableManageColumnsPanel';

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_ROW_HEIGHT_ESTIMATE = 53;
const EMPTY_ICONS: DataTableIcons = {};
const EMPTY_COLUMN_PINNING: ColumnPinningState = { left: [], right: [] };

/** Shallow-compares two sticky offset maps (column id -> px). */
function haveSameOffsets(
  a: Record<string, number>,
  b: Record<string, number>,
): boolean {
  const aKeys = Object.keys(a);

  return (
    aKeys.length === Object.keys(b).length &&
    aKeys.every((key) => a[key] === b[key])
  );
}

/** Maps a column meta align onto the header cell flex container. */
const HEADER_JUSTIFY_CONTENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

/** Where a floating panel opens and which of its top corners pins there. */
type DataTablePanelAnchor = {
  anchorPosition: { top: number; left: number };
  transformHorizontal: 'left' | 'right';
};

/**
 * One floating column panel is open at a time: a column's kebab menu
 * (anchored to its button), or the filter / manage columns panels
 * (anchored to a position snapshot, since they can outlive the element
 * that opened them). With the toolbar shown, those two panels anchor to
 * their toolbar button instead, wherever they were opened from.
 */
type DataTableColumnPanelState =
  | { type: 'menu'; columnId: string; anchorEl: HTMLElement }
  | ({ type: 'filter'; columnId: string } & DataTablePanelAnchor)
  | ({ type: 'manageColumns' } & DataTablePanelAnchor)
  | null;

/**
 * TanStack-style table state that is controlled when the consumer passes
 * the state prop and internal otherwise; the change handler resolves
 * updater functions and reports the next value either way.
 */
function useControllableState<T>(
  initialValue: T,
  controlledValue: T | undefined,
  onChange?: (next: T) => void,
): [T, OnChangeFn<T>] {
  const [internalValue, setInternalValue] = useState<T>(initialValue);

  const value = controlledValue ?? internalValue;

  const handleChange: OnChangeFn<T> = (updater) => {
    const next =
      typeof updater === 'function'
        ? (updater as (previous: T) => T)(value)
        : updater;

    if (controlledValue === undefined) {
      setInternalValue(next);
    }

    onChange?.(next);
  };

  return [value, handleChange];
}

export function DataTable<TData extends DataTableData>({
  data,
  columns,
  getRowId,
  renderRow,
  initialSorting = [],
  sorting: controlledSorting,
  onSortingChange,
  manualSorting = false,
  initialPageSize = DEFAULT_PAGE_SIZE,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  pagination: controlledPagination,
  onPaginationChange,
  manualPagination = false,
  rowCount,
  disableSorting = false,
  disablePagination = false,
  enableColumnResizing = false,
  enableColumnMenu = false,
  enableColumnPinning = false,
  showToolbar = false,
  initialFilters = EMPTY_FILTERS,
  filters: controlledFilters,
  onFiltersChange,
  manualFiltering = false,
  initialSearch = '',
  search: controlledSearch,
  onSearchChange,
  initialColumnVisibility = {},
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  initialColumnPinning = EMPTY_COLUMN_PINNING,
  columnPinning: controlledColumnPinning,
  onColumnPinningChange,
  footerLeft,
  estimateRowHeight = DEFAULT_ROW_HEIGHT_ESTIMATE,
  maxHeight = 600,
  tableLayout = 'auto',
  icons = EMPTY_ICONS,
  emptyMessage = 'No data to display.',
  isLoading = false,
  renderLoading,
}: Readonly<DataTableProps<TData>>) {
  // Custom icon slots — capitalized so JSX treats them as components.
  // Unset slots fall back to the MUI default; the slots used by the column
  // menu and the floating panels are resolved inside those components.
  const {
    columnMenu: ColumnMenuIcon = MoreVert,
    filter: FilterIcon = FilterAlt,
    openFilterPanel: OpenFilterPanelIcon = FilterList,
    manageColumns: ManageColumnsIcon = ViewColumn,
    search: SearchIcon = Search,
    close: CloseIcon = Close,
  } = icons;
  // Controlled when the consumer passes a sorting prop, internal otherwise.
  const [sorting, handleSortingChange] = useControllableState<SortingState>(
    initialSorting,
    controlledSorting,
    onSortingChange,
  );

  // Controlled when the consumer passes a pagination prop (e.g. to reset
  // the page when filters change), internal otherwise.
  const [pagination, handlePaginationChange] =
    useControllableState<PaginationState>(
      { pageIndex: 0, pageSize: initialPageSize },
      controlledPagination,
      onPaginationChange,
    );

  // Multi-row filter state written by the filter panel. Pre-filtered
  // client-side (OR/AND via applyFilters); with manualFiltering the
  // consumer handles it from onFiltersChange.
  const [filters, handleFiltersChange] =
    useControllableState<DataTableActiveFilters>(
      initialFilters,
      controlledFilters,
      onFiltersChange,
    );

  // Quick-search query written by the toolbar search input. Pre-filtered
  // client-side across every column value; with manualFiltering the
  // consumer handles it from onSearchChange.
  const [search, handleSearchChange] = useControllableState<string>(
    initialSearch,
    controlledSearch,
    onSearchChange,
  );

  // Column visibility written by the column menu and the manage columns
  // panel — `{ [columnId]: false }` hides a column.
  const [columnVisibility, handleColumnVisibilityChange] =
    useControllableState<VisibilityState>(
      initialColumnVisibility,
      controlledColumnVisibility,
      onColumnVisibilityChange,
    );

  // Pinned columns written by the column menu's pin actions —
  // `{ left: [...columnIds], right: [...columnIds] }`.
  const [columnPinning, handleColumnPinningChange] =
    useControllableState<ColumnPinningState>(
      initialColumnPinning,
      controlledColumnPinning,
      onColumnPinningChange,
    );

  // Internal-only: dragged column widths, keyed by column id.
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  // TanStack computes drag deltas from the column's believed size, which
  // falls back to a 150px default for columns sized by the browser's table
  // layout — the first drag would snap such a column to ~150px. Seeding
  // the def with the cell's rendered width right before the drag starts
  // makes resizing track from the real width instead. (column.columnDef
  // is TanStack's merged copy, so consumer defs are never mutated.)
  const startColumnResize = (
    header: Header<TData, unknown>,
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ): void => {
    if (columnSizing[header.column.id] === undefined) {
      const width = event.currentTarget
        .closest('th')
        ?.getBoundingClientRect().width;

      if (width) {
        header.column.columnDef.size = Math.round(width);
      }
    }

    header.getResizeHandler()(event);
  };

  // The currently open column panel (kebab menu), if any.
  const [columnPanel, setColumnPanel] =
    useState<DataTableColumnPanelState>(null);

  const closeColumnPanel = (): void => {
    setColumnPanel(null);
  };

  const toolbarFilterButtonRef = useRef<HTMLButtonElement>(null);
  const toolbarManageColumnsButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // The toolbar search expands from its icon button into the input on
  // focus and collapses back on blur — unless a query is active, which
  // keeps it expanded.
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const isSearchOpen = isSearchExpanded || search !== '';

  // With the toolbar shown, the filter / manage columns panels always open
  // under their toolbar button — even when triggered from a column menu —
  // pinning their top-right corner so they grow leftward over the table.
  // Without it, they open at the element that opened them.
  const getPanelAnchor = (
    opener: HTMLElement,
    toolbarButton: HTMLElement | null,
  ): DataTablePanelAnchor => {
    if (toolbarButton) {
      const rect = toolbarButton.getBoundingClientRect();

      return {
        anchorPosition: { top: rect.bottom, left: rect.right },
        transformHorizontal: 'right',
      };
    }

    const rect = opener.getBoundingClientRect();

    return {
      anchorPosition: { top: rect.bottom, left: rect.left },
      transformHorizontal: 'left',
    };
  };

  const openFilterPanel = (columnId: string, opener: HTMLElement): void => {
    setColumnPanel({
      type: 'filter',
      columnId,
      ...getPanelAnchor(opener, toolbarFilterButtonRef.current),
    });
  };

  const openManageColumnsPanel = (opener: HTMLElement): void => {
    setColumnPanel({
      type: 'manageColumns',
      ...getPanelAnchor(opener, toolbarManageColumnsButtonRef.current),
    });
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const resolvedColumns = useMemo(() => {
    const base = columns ?? inferColumns(data);

    return enableColumnResizing ? applyMetaWidthsToSizes(base) : base;
  }, [columns, data, enableColumnResizing]);

  // Multi-filter + quick-search pre-processing: apply the active filter
  // rows and the search query to `data` before handing it to TanStack.
  // Handles both AND and OR logic (TanStack can only AND column filters
  // natively). With manualFiltering the consumer receives onFiltersChange
  // / onSearchChange and handles both on the server.
  const filteredData = useMemo(
    () =>
      manualFiltering ? data : applySearch(applyFilters(data, filters), search),
    [data, filters, search, manualFiltering],
  );

  const table = useReactTable({
    // filteredData is already filtered — tell TanStack not to re-filter.
    data: filteredData,
    columns: resolvedColumns,
    state: {
      ...(disableSorting ? {} : { sorting }),
      ...(disablePagination ? {} : { pagination }),
      // Only wired in when enabled so a stray pinning state can't reorder
      // columns on tables that never opted in.
      ...(enableColumnPinning ? { columnPinning } : {}),
      columnVisibility,
      columnSizing,
    },
    // What the manage columns panel's Reset restores
    // (table.resetColumnVisibility resets to initialState).
    initialState: { columnVisibility: initialColumnVisibility },
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onColumnPinningChange: handleColumnPinningChange,
    onColumnSizingChange: setColumnSizing,
    // Drives column.getCanPin(), which the column menu's pin actions key
    // off. Per-column opt-out via `enablePinning: false` on the def.
    enableColumnPinning,
    // Live resizing: the dragged column tracks the pointer instead of
    // snapping on release. Virtualization keeps the re-render cost low.
    columnResizeMode: 'onChange',
    enableColumnResizing,
    getCoreRowModel: getCoreRowModel(),
    // Sorting is opt-in per column: only columns declaring
    // `enableSorting: true` on their def get a sort header. (TanStack's
    // own default is the inverse — sortable unless opted out.)
    defaultColumn: { enableSorting: false },
    // Makes getCanSort() false for every column, so headers render as
    // plain labels instead of TableSortLabels.
    enableSorting: !disableSorting,
    // Server-side sorting: header clicks only update the sorting state,
    // so the sorted row model (client-side sorting) must stay off.
    manualSorting,
    ...(disableSorting || manualSorting
      ? {}
      : { getSortedRowModel: getSortedRowModel() }),
    // Server-side pagination: `data` already is the current page, so the
    // pagination row model (client-side slicing) must stay off. rowCount
    // lets setPageIndex clamp to the real page count.
    manualPagination,
    ...(manualPagination && rowCount !== undefined ? { rowCount } : {}),
    // Lets custom rows drive detail panels through the TanStack expansion
    // API (row.getIsExpanded / row.getToggleExpandedHandler). The expanded
    // state is keyed by row id, so it survives sorting, page changes and
    // virtualization unmounts — pass getRowId for stable keys.
    getRowCanExpand: () => true,
    ...(disablePagination || manualPagination
      ? {}
      : { getPaginationRowModel: getPaginationRowModel() }),
    ...(getRowId ? { getRowId } : {}),
  });

  // Rows of the current page (or all rows when pagination is disabled).
  const rows = table.getRowModel().rows;
  // With manual pagination only the current page is loaded, so the
  // pre-pagination row model can't provide the total — the server does.
  const totalRowCount = manualPagination
    ? (rowCount ?? data.length)
    : table.getPrePaginationRowModel().rows.length;
  // Visible leaf columns drive the colSpan of full-width rows (loading,
  // empty, dividers, virtualizer padding) — hidden columns don't count.
  const columnCount = table.getVisibleLeafColumns().length || 1;

  // Visible pinned leaf columns in pinned order — drive the sticky
  // offsets and the edge dividers between pinned and scrolling regions.
  const leftPinnedIds = enableColumnPinning
    ? table.getLeftVisibleLeafColumns().map((column) => column.id)
    : [];
  const rightPinnedIds = enableColumnPinning
    ? table.getRightVisibleLeafColumns().map((column) => column.id)
    : [];

  // Column whose kebab menu is open. Resolved per render so the menu sees
  // fresh sorting state.
  const menuColumn =
    columnPanel?.type === 'menu'
      ? table.getColumn(columnPanel.columnId)
      : undefined;

  // Toolbar derivations: the badge count on the filter button, and the
  // column preselected when it opens the panel with no active rows. The
  // filter button is omitted when no column is filterable.
  const totalActiveFilterCount = showToolbar
    ? filters.rows.filter(isFilterRowActive).length
    : 0;
  const firstFilterableColumnId = showToolbar
    ? table.getAllLeafColumns().find((column) => column.getCanFilter())?.id
    : undefined;

  // Grouped columns produce multiple header rows. MUI's stickyHeader pins
  // every header cell at top: 0, so rows below the first must be offset by
  // the measured height of the rows above to stack instead of overlapping.
  const headerGroups = table.getHeaderGroups();
  const headerRowCount = headerGroups.length;
  const headerRowRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [headerRowTops, setHeaderRowTops] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (headerRowCount <= 1) {
      setHeaderRowTops((previous) => (previous.length === 0 ? previous : []));
      return undefined;
    }

    const measure = () => {
      const tops: number[] = [];
      let offset = 0;

      for (let index = 0; index < headerRowCount; index += 1) {
        tops.push(offset);
        offset += headerRowRefs.current[index]?.offsetHeight ?? 0;
      }

      // Returning the previous array when nothing changed keeps the state
      // referentially stable so re-measures don't cause render loops.
      setHeaderRowTops((previous) =>
        previous.length === tops.length &&
        previous.every((top, index) => top === tops[index])
          ? previous
          : tops,
      );
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    // Re-measure when header rows change height (e.g. a resize wraps the
    // labels) — fires only on actual size changes.
    const observer = new ResizeObserver(measure);

    headerRowRefs.current
      .slice(0, headerRowCount)
      .forEach((row) => row && observer.observe(row));

    return () => observer.disconnect();
  }, [headerRowCount, resolvedColumns]);

  // Pinned cells stick via CSS left/right offsets equal to the summed
  // widths of the pinned columns before them. Widths are measured from
  // the rendered header cells — TanStack's own offsets assume the defs'
  // sizes, which the browser's auto table layout does not honor.
  const pinnedHeaderCellRefs = useRef<
    Record<string, HTMLTableCellElement | null>
  >({});
  const [pinnedOffsets, setPinnedOffsets] = useState<{
    left: Record<string, number>;
    right: Record<string, number>;
  }>({ left: {}, right: {} });

  // Joined ids so the effect re-runs only when the pinned sets change.
  const leftPinnedKey = leftPinnedIds.join(',');
  const rightPinnedKey = rightPinnedIds.join(',');

  useLayoutEffect(() => {
    if (leftPinnedKey === '' && rightPinnedKey === '') {
      setPinnedOffsets((previous) =>
        Object.keys(previous.left).length === 0 &&
        Object.keys(previous.right).length === 0
          ? previous
          : { left: {}, right: {} },
      );
      return undefined;
    }

    const leftIds = leftPinnedKey === '' ? [] : leftPinnedKey.split(',');
    const rightIds = rightPinnedKey === '' ? [] : rightPinnedKey.split(',');

    const measure = () => {
      const left: Record<string, number> = {};
      let offset = 0;

      for (const id of leftIds) {
        left[id] = offset;
        offset +=
          pinnedHeaderCellRefs.current[id]?.getBoundingClientRect().width ?? 0;
      }

      // Right offsets accumulate from the right edge inward.
      const right: Record<string, number> = {};
      offset = 0;

      for (const id of [...rightIds].reverse()) {
        right[id] = offset;
        offset +=
          pinnedHeaderCellRefs.current[id]?.getBoundingClientRect().width ?? 0;
      }

      // Returning the previous object when nothing changed keeps the state
      // referentially stable so re-measures don't cause render loops.
      setPinnedOffsets((previous) =>
        haveSameOffsets(previous.left, left) &&
        haveSameOffsets(previous.right, right)
          ? previous
          : { left, right },
      );
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    // Re-measure when a pinned column changes width (drag-resize, data
    // reflowing the auto layout) — fires only on actual size changes.
    const observer = new ResizeObserver(measure);

    [...leftIds, ...rightIds].forEach((id) => {
      const cell = pinnedHeaderCellRefs.current[id];

      if (cell) {
        observer.observe(cell);
      }
    });

    return () => observer.disconnect();
    // resolvedColumns remounts the header cells, so the observer must
    // re-attach to the new nodes.
  }, [leftPinnedKey, rightPinnedKey, resolvedColumns]);

  // Last left-pinned / first right-pinned column — where the pinned
  // region meets the scrolling columns; the edge divider draws there.
  const isPinnedEdge = (
    pinned: ColumnPinningPosition,
    columnId: string,
  ): boolean =>
    pinned === 'left'
      ? leftPinnedIds[leftPinnedIds.length - 1] === columnId
      : rightPinnedIds[0] === columnId;

  // Offsets are inline style (not sx) — they change on every resize-drag
  // frame and would churn Emotion classes.
  const getPinnedOffsetStyle = (
    pinned: ColumnPinningPosition,
    columnId: string,
  ): React.CSSProperties | undefined => {
    if (pinned === 'left') {
      return { left: pinnedOffsets.left[columnId] ?? 0 };
    }

    if (pinned === 'right') {
      return { right: pinnedOffsets.right[columnId] ?? 0 };
    }

    return undefined;
  };

  // Sticky styles for a pinned body cell. The solid background hides the
  // columns scrolling underneath; row hover is overlaid as a gradient so
  // the cell stays opaque. (Header cells get their stickiness and
  // background from MUI's stickyHeader instead.)
  const getPinnedCellSx = (
    pinned: ColumnPinningPosition,
    columnId: string,
  ): SxProps<Theme> | undefined => {
    if (!pinned) {
      return undefined;
    }

    return (theme) => ({
      position: 'sticky',
      zIndex: 1,
      bgcolor: 'background.paper',
      '.MuiTableRow-hover:hover > &': {
        backgroundImage: `linear-gradient(${theme.palette.action.hover}, ${theme.palette.action.hover})`,
      },
      ...(isPinnedEdge(pinned, columnId)
        ? {
            boxShadow: `inset ${pinned === 'left' ? -1 : 1}px 0 0 ${theme.palette.divider}`,
          }
        : {}),
    });
  };

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 5,
  });

  const { pageIndex, pageSize } = table.getState().pagination;

  // Bring the new page into view from the top whenever the page changes.
  useEffect(() => {
    virtualizer.scrollToOffset(0);
  }, [pageIndex, virtualizer]);

  const virtualItems = virtualizer.getVirtualItems();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;

  const paddingBottom =
    virtualItems.length > 0
      ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {showToolbar && (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          spacing={0.5}
          sx={{ mb: 0.5 }}
        >
          <Tooltip title='Manage columns' placement='bottom' arrow>
            <IconButton
              ref={toolbarManageColumnsButtonRef}
              size='small'
              aria-label='Manage columns'
              onClick={(event) => openManageColumnsPanel(event.currentTarget)}
            >
              <ManageColumnsIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {firstFilterableColumnId !== undefined && (
            <Tooltip title='Filters' placement='bottom' arrow>
              <IconButton
                ref={toolbarFilterButtonRef}
                size='small'
                aria-label='Show filters'
                onClick={(event) =>
                  openFilterPanel(firstFilterableColumnId, event.currentTarget)
                }
              >
                <Badge badgeContent={totalActiveFilterCount} color='primary'>
                  <OpenFilterPanelIcon fontSize='small' />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          {/* Search button that expands into the quick-search input. The
              icon button is the input's start adornment, so the field
              grows open around it — expanding on focus and collapsing on
              blur once the query is cleared. */}
          <TextField
            size='small'
            variant='outlined'
            value={search}
            placeholder='Search…'
            inputRef={searchInputRef}
            onChange={(event) => handleSearchChange(event.target.value)}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
            onKeyDown={(event) => {
              // Escape clears the query; the blur then collapses the input.
              if (event.key === 'Escape') {
                handleSearchChange('');
                searchInputRef.current?.blur();
              }
            }}
            inputProps={{ 'aria-label': 'Search' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Tooltip title='Search' placement='bottom' arrow>
                    <IconButton
                      size='small'
                      aria-label='Show search'
                      onClick={() => searchInputRef.current?.focus()}
                    >
                      <SearchIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
              endAdornment:
                search === '' ? undefined : (
                  <InputAdornment position='end'>
                    <Tooltip title='Clear' placement='bottom' arrow>
                      <IconButton
                        size='small'
                        aria-label='Clear search'
                        onClick={() => {
                          handleSearchChange('');
                          searchInputRef.current?.focus();
                        }}
                      >
                        <CloseIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
            }}
            sx={{
              // Collapsed, only the icon button is visible — the input is
              // clipped away and the outline fades out with it.
              width: isSearchOpen ? 220 : 34,
              transition: 'width .2s',
              overflow: 'hidden',
              // Tightened from the outlined default (14px) so the icon
              // button hugs the field edges like the other toolbar buttons.
              '& .MuiOutlinedInput-root': { pl: 0.5, pr: 0.5 },
              '& .MuiOutlinedInput-notchedOutline': {
                opacity: isSearchOpen ? 1 : 0,
                transition: 'opacity .2s',
              },
            }}
          />
        </Stack>
      )}
      <TableContainer ref={scrollContainerRef} sx={{ maxHeight }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650, tableLayout }}
          aria-label='data table'
        >
          <TableHead>
            {headerGroups.map((headerGroup, rowIndex) => (
              <TableRow
                key={headerGroup.id}
                ref={(element) => {
                  headerRowRefs.current[rowIndex] = element;
                }}
              >
                {headerGroup.headers.map((header) => {
                  const { column } = header;

                  // Each column renders exactly one header cell, on the row
                  // matching its nesting depth: group headers on their own
                  // row, leaf headers spanning the remaining rows — like the
                  // BillableEventsTable two-row header. The other slots
                  // TanStack emits for the column (placeholders above, the
                  // repeated leaf header below) are skipped.
                  if (column.depth !== rowIndex) {
                    return null;
                  }

                  const meta = getColumnMeta(column.columnDef.meta);
                  const isGroupHeader = column.columns.length > 0;
                  const rowSpan = isGroupHeader ? 1 : headerRowCount - rowIndex;
                  const align =
                    meta?.align ?? (isGroupHeader ? 'center' : 'left');
                  const canSort = column.getCanSort();
                  const sortDirection = column.getIsSorted();
                  const canResize =
                    enableColumnResizing &&
                    !isGroupHeader &&
                    column.getCanResize();
                  const isResized =
                    enableColumnResizing &&
                    columnSizing[column.id] !== undefined;
                  const isResizing = column.getIsResizing();
                  // Group headers can't pin (only leaf columns can).
                  const pinned: ColumnPinningPosition = isGroupHeader
                    ? false
                    : column.getIsPinned();
                  const showColumnMenu = enableColumnMenu && !isGroupHeader;
                  const isMenuOpen =
                    columnPanel?.type === 'menu' &&
                    columnPanel.columnId === column.id;
                  // Compute from our filter state — TanStack's columnFilters
                  // is no longer used.
                  const activeFilterCount = showColumnMenu
                    ? filters.rows.filter(
                        (r) => r.columnId === column.id && isFilterRowActive(r),
                      ).length
                    : 0;
                  const isFiltered = activeFilterCount > 0;

                  const label = (
                    <Typography
                      component='span'
                      variant='subtitle2'
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: 12,
                        fontWeight: 900,
                      }}
                    >
                      {flexRender(column.columnDef.header, header.getContext())}
                    </Typography>
                  );

                  const headerContent = canSort ? (
                    <TableSortLabel
                      active={sortDirection !== false}
                      direction={
                        sortDirection === false ? 'asc' : sortDirection
                      }
                      // Blocks re-sorting while a page is being
                      // fetched (relevant with manualSorting).
                      disabled={isLoading}
                      onClick={column.getToggleSortingHandler()}
                      // undefined keeps the MUI default arrow.
                      IconComponent={icons.sort}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  );

                  return (
                    <TableCell
                      key={header.id}
                      // Pinned header cells are the width source for the
                      // sticky offsets.
                      ref={(element: HTMLTableCellElement | null) => {
                        if (pinned) {
                          pinnedHeaderCellRefs.current[column.id] = element;
                        }
                      }}
                      align={align}
                      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
                      rowSpan={rowSpan > 1 ? rowSpan : undefined}
                      sortDirection={sortDirection}
                      // Dragged width and sticky offset are inline style
                      // (not sx) — they change on every drag frame and
                      // would churn Emotion classes.
                      style={{
                        ...(isResized ? { width: column.getSize() } : {}),
                        ...getPinnedOffsetStyle(pinned, column.id),
                      }}
                      sx={{
                        width: meta?.width,
                        // Group labels sit borderless above their
                        // sub-columns, matching BillableEventsTable.
                        ...(isGroupHeader ? { borderBottom: 'none' } : {}),
                        ...(rowIndex > 0
                          ? { top: headerRowTops[rowIndex] ?? 0 }
                          : {}),
                        // Pinned headers float above the other sticky
                        // header cells (MUI's stickyHeader is zIndex 2)
                        // and draw the divider toward the scroll region.
                        // The horizontal stickiness itself comes from the
                        // stickyHeader position plus the inline offset.
                        ...(pinned
                          ? {
                              zIndex: 3,
                              ...(isPinnedEdge(pinned, column.id)
                                ? {
                                    boxShadow: (theme: Theme) =>
                                      `inset ${pinned === 'left' ? -1 : 1}px 0 0 ${theme.palette.divider}`,
                                  }
                                : {}),
                            }
                          : {}),
                        // The kebab stays invisible until the header is
                        // hovered (or focused via keyboard), and pinned
                        // while its menu is open — like the MUI DataGrid.
                        ...(showColumnMenu
                          ? {
                              '& .DataTable-columnMenuButton': {
                                opacity: isMenuOpen ? 1 : 0,
                                transition: 'opacity .2s',
                              },
                              '&:hover .DataTable-columnMenuButton, &:focus-within .DataTable-columnMenuButton':
                                { opacity: 1 },
                            }
                          : {}),
                      }}
                    >
                      {showColumnMenu ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            justifyContent: HEADER_JUSTIFY_CONTENT[align],
                          }}
                        >
                          {headerContent}
                          {isFiltered && (
                            <Tooltip
                              title={`${activeFilterCount} active ${activeFilterCount === 1 ? 'filter' : 'filters'}`}
                              placement='bottom'
                              arrow
                            >
                              <IconButton
                                size='small'
                                aria-label={`${getColumnLabel(column)} filter`}
                                onClick={(event) =>
                                  openFilterPanel(
                                    column.id,
                                    event.currentTarget,
                                  )
                                }
                              >
                                <FilterIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title='Menu' placement='bottom' arrow>
                            <IconButton
                              size='small'
                              className='DataTable-columnMenuButton'
                              aria-label={`${getColumnLabel(column)} column menu`}
                              onClick={(event) =>
                                setColumnPanel({
                                  type: 'menu',
                                  columnId: column.id,
                                  anchorEl: event.currentTarget,
                                })
                              }
                              // Pushes the kebab to the cell edge so it does
                              // not float next to short labels (right-aligned
                              // columns already sit at the edge).
                              sx={
                                align !== 'right' ? { ml: 'auto' } : undefined
                              }
                            >
                              <ColumnMenuIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        headerContent
                      )}
                      {canResize && (
                        <Box
                          className='DataTable-columnResizer'
                          aria-hidden
                          onMouseDown={(event) =>
                            startColumnResize(header, event)
                          }
                          onTouchStart={(event) =>
                            startColumnResize(header, event)
                          }
                          onDoubleClick={() => column.resetSize()}
                          sx={{
                            // The sticky header cell is the positioned
                            // ancestor, so the handle hugs its right edge.
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            width: 9,
                            cursor: 'col-resize',
                            touchAction: 'none',
                            userSelect: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // Vertical separator line — grows and recolors
                            // while hovered or dragging. The line color is
                            // painted by background-color, so that (not
                            // `color`) is what transitions.
                            '&::after': {
                              content: '""',
                              transition: 'background-color .2s',
                              width: '1px',
                              height: '50%',
                              bgcolor: 'divider',
                            },
                            '&:hover::after': {
                              width: '4px',
                              bgcolor: 'primary.main',
                            },
                            ...(isResizing
                              ? {
                                  '&::after, &:hover::after': {
                                    width: '4px',
                                    bgcolor: 'primary.main',
                                  },
                                }
                              : {}),
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading &&
              rows.length === 0 &&
              (renderLoading ? (
                renderLoading(columnCount)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columnCount}
                    sx={{ textAlign: 'center', py: 2 }}
                  >
                    <Typography color='text.secondary'>Loading...</Typography>
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnCount}>{emptyMessage}</TableCell>
              </TableRow>
            )}

            {paddingTop > 0 && (
              <TableRow>
                {/* Height is inline style (not sx) — it changes on every
                    scroll frame and would churn Emotion classes. */}
                <TableCell
                  colSpan={columnCount}
                  sx={{ p: 0, border: 'none' }}
                  style={{ height: paddingTop }}
                />
              </TableRow>
            )}

            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index];

              const rowProps = {
                'data-index': virtualRow.index,
                ref: virtualizer.measureElement,
              };

              const renderDefaultRow = () => (
                <>
                  <TableRow
                    hover
                    {...rowProps}
                    sx={{ '& > td': { borderBottom: 'unset' } }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = getColumnMeta(cell.column.columnDef.meta);
                      const pinned = cell.column.getIsPinned();

                      return (
                        <TableCell
                          key={cell.id}
                          align={meta?.align}
                          style={getPinnedOffsetStyle(pinned, cell.column.id)}
                          sx={getPinnedCellSx(pinned, cell.column.id)}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/* Divider row — draws the full-width line below the row,
                      matching the dashboard team table design. */}
                  <TableRow>
                    <TableCell colSpan={columnCount} sx={{ py: 0 }} />
                  </TableRow>
                </>
              );

              return (
                <React.Fragment key={row.id}>
                  {renderRow
                    ? renderRow({ row, virtualRow, rowProps, renderDefaultRow })
                    : renderDefaultRow()}
                </React.Fragment>
              );
            })}

            {paddingBottom > 0 && (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  sx={{ p: 0, border: 'none' }}
                  style={{ height: paddingBottom }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {columnPanel?.type === 'menu' && menuColumn && (
        <DataTableColumnMenu
          column={menuColumn}
          anchorEl={columnPanel.anchorEl}
          icons={icons}
          isLoading={isLoading}
          onClose={closeColumnPanel}
          onOpenFilter={() =>
            openFilterPanel(columnPanel.columnId, columnPanel.anchorEl)
          }
          onOpenManageColumns={() =>
            openManageColumnsPanel(columnPanel.anchorEl)
          }
        />
      )}
      {columnPanel?.type === 'filter' && (
        <DataTableFilterPanel
          table={table}
          initialColumnId={columnPanel.columnId}
          anchorPosition={columnPanel.anchorPosition}
          transformHorizontal={columnPanel.transformHorizontal}
          icons={icons}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClose={closeColumnPanel}
        />
      )}
      {columnPanel?.type === 'manageColumns' && (
        <DataTableManageColumnsPanel
          table={table}
          anchorPosition={columnPanel.anchorPosition}
          transformHorizontal={columnPanel.transformHorizontal}
          icons={icons}
          onClose={closeColumnPanel}
        />
      )}
      {(footerLeft !== undefined || !disablePagination) && (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={
            footerLeft !== undefined ? 'space-between' : 'flex-end'
          }
          sx={{ mt: 1 }}
        >
          {footerLeft}
          {!disablePagination && (
            <TablePagination
              component='div'
              showFirstButton
              showLastButton
              // Blocks page/page-size changes while a page is being
              // fetched (relevant with manualPagination).
              disabled={isLoading}
              sx={{
                // Vertically centers the rows-per-page select value with the
                // surrounding toolbar text.
                '& .MuiTablePagination-select': {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
              count={totalRowCount}
              page={pageIndex}
              rowsPerPage={pageSize}
              rowsPerPageOptions={pageSizeOptions}
              onPageChange={(_, page) => table.setPageIndex(page)}
              onRowsPerPageChange={(event) =>
                table.setPageSize(Number(event.target.value))
              }
              // undefined slots keep the MUI default arrows.
              slots={{
                actions: {
                  firstButtonIcon: icons.paginationFirst,
                  previousButtonIcon: icons.paginationPrevious,
                  nextButtonIcon: icons.paginationNext,
                  lastButtonIcon: icons.paginationLast,
                },
              }}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}
