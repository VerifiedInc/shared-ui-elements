import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, TouchEvent } from 'react';

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type ColumnPinningPosition,
  type ColumnPinningState,
  type ColumnSizingState,
  type Header,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { SxProps, Theme } from '@mui/material';
import { Box, Table, TableContainer } from '@mui/material';

import type {
  DataTableActiveFilters,
  DataTableCellProps,
  DataTableData,
  DataTableIcons,
  DataTableProps,
} from './DataTable.types';
import { useBidirectionalScroll } from '../../hooks/useBidirectionalScroll';
import {
  DataTableProvider,
  type DataTableColumnPanelState,
  type DataTableContextValue,
  type DataTablePanelAnchor,
} from './DataTable.context';
import {
  useControllableState,
  useHeaderRowTops,
  usePinnedOffsets,
  useStickyHeaderHeight,
} from './DataTable.hooks';
import { applyFilters, applySearch, EMPTY_FILTERS } from './DataTable.filters';
import {
  applyMetaWidthsToSizes,
  getColumnMeta,
  inferColumns,
  measureRowGroup,
} from './DataTable.utils';
import { DataTableBody } from './DataTableBody';
import { DataTableFooter } from './DataTableFooter';
import { DataTableHead } from './DataTableHead';
import { DataTablePanels } from './DataTablePanels';
import { DataTableToolbar } from './DataTableToolbar';

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_ROW_HEIGHT_ESTIMATE = 53;
const EMPTY_ICONS: DataTableIcons = {};
const EMPTY_COLUMN_PINNING: ColumnPinningState = { left: [], right: [] };
// Placeholder load callbacks while bidirectional scroll is disabled — the
// hook is gated off, so they never run.
const NOOP = (): void => {};

// First leaf column id (depth-first), used to pin the left-most column by default. Reads the
// explicit `id`, falling back to a string `accessorKey`, undefined if neither can be determined.
function findFirstLeafColumnId<TData>(
  cols: ReadonlyArray<ColumnDef<TData, unknown>> | undefined,
): string | undefined {
  for (const col of cols ?? []) {
    const group = (col as { columns?: ReadonlyArray<ColumnDef<TData, unknown>> }).columns;
    if (group?.length) {
      const childId = findFirstLeafColumnId(group);
      if (childId) return childId;
      continue;
    }
    const accessorKey = (col as { accessorKey?: unknown }).accessorKey;
    const id =
      (col as { id?: string }).id ??
      (typeof accessorKey === 'string' ? accessorKey : undefined);
    if (id) return id;
  }
  return undefined;
}

/**
 * Root of the DataTable: owns every piece of table state and the TanStack
 * instance, shares them with the subcomponents (toolbar, head, body,
 * footer, floating panels) through DataTableProvider, and renders the
 * layout shell around them.
 */
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
  bidirectionalScroll,
  enableColumnResizing = false,
  enableColumnMenu = false,
  enableColumnPinning = false,
  pinFirstColumn = true,
  showToolbar = false,
  enableExport = false,
  exportFilename = 'data',
  additionalExportColumns,
  initialFilters = EMPTY_FILTERS,
  filters: controlledFilters,
  onFiltersChange,
  manualFiltering = false,
  renderFilterPanel,
  activeFilterCount,
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
  minWidth = 650,
  maxHeight = 800,
  tableLayout = 'auto',
  icons = EMPTY_ICONS,
  emptyMessage = 'No data to display.',
  isLoading = false,
  renderLoading,
}: Readonly<DataTableProps<TData>>) {
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
  // client-side across the columns' cell values; with manualFiltering the
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

  // Pin the left-most column by default (pinFirstColumn) unless the consumer drives pinning or
  // sets its own initial pinning. The pin is applied even without enableColumnPinning (which only
  // governs the column-menu pin actions).
  const firstLeafColumnId = useMemo(
    () => findFirstLeafColumnId(columns),
    [columns],
  );
  const defaultColumnPinning =
    controlledColumnPinning === undefined &&
    initialColumnPinning === EMPTY_COLUMN_PINNING &&
    pinFirstColumn &&
    firstLeafColumnId
      ? { left: [firstLeafColumnId], right: [] }
      : initialColumnPinning;

  // Pinned columns written by the column menu's pin actions —
  // `{ left: [...columnIds], right: [...columnIds] }`.
  const [columnPinning, handleColumnPinningChange] =
    useControllableState<ColumnPinningState>(
      defaultColumnPinning,
      controlledColumnPinning,
      onColumnPinningChange,
    );

  // Pinning state/offsets apply when the menu pin actions are enabled OR a default first-column
  // pin is in effect, independent of `enableColumnPinning`, which only gates the menu actions.
  const columnPinningActive =
    enableColumnPinning || (pinFirstColumn && firstLeafColumnId !== undefined);

  // Internal-only: dragged column widths, keyed by column id.
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  // True once any column has been dragged — every column is then frozen at
  // an explicit width (see startColumnResize / the header cell widths).
  const hasResizedColumns =
    enableColumnResizing && Object.keys(columnSizing).length > 0;

  // The currently open column panel (kebab menu), if any.
  const [columnPanel, setColumnPanel] =
    useState<DataTableColumnPanelState>(null);

  const closeColumnPanel = (): void => {
    setColumnPanel(null);
  };

  const toolbarFilterButtonRef = useRef<HTMLButtonElement>(null);
  const toolbarManageColumnsButtonRef = useRef<HTMLButtonElement>(null);

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
  // natively). Values resolve through the column accessors, so both match
  // what the cells display — not raw row fields that never render. With
  // manualFiltering the consumer receives onFiltersChange / onSearchChange
  // and handles both on the server.
  const filteredData = useMemo(
    () =>
      manualFiltering
        ? data
        : applySearch(
            applyFilters(data, filters, resolvedColumns),
            search,
            resolvedColumns,
          ),
    [data, filters, search, manualFiltering, resolvedColumns],
  );

  const table = useReactTable({
    // filteredData is already filtered — tell TanStack not to re-filter.
    data: filteredData,
    columns: resolvedColumns,
    state: {
      ...(disableSorting ? {} : { sorting }),
      ...(disablePagination ? {} : { pagination }),
      // Only wired in when active so a stray pinning state can't reorder
      // columns on tables that never opted in (menu pinning or first-column pin).
      ...(columnPinningActive ? { columnPinning } : {}),
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

  // Explicit widths come either from a resize drag (above) or from numeric
  // column widths set up front — `meta.width`, copied onto the column size
  // by applyMetaWidthsToSizes. Either way the table is sized to the sum of
  // the column widths so a wide column grows the table — adding horizontal
  // scroll — instead of reflowing (shrinking) its neighbors, matching the
  // drag-resize behavior. Until a drag freezes every column, columns
  // without an explicit width stay auto and flex to fill the rest.
  // (A percentage meta.width isn't a fixed px width — it splits the
  // available space, so it doesn't put the table into this mode.)
  const hasInitialColumnSizes =
    enableColumnResizing &&
    table
      .getVisibleLeafColumns()
      .some(
        (column) =>
          typeof getColumnMeta(column.columnDef.meta)?.width === 'number',
      );
  const hasExplicitColumnSizes = hasResizedColumns || hasInitialColumnSizes;

  // Visible pinned leaf columns in pinned order — drive the sticky
  // offsets and the edge dividers between pinned and scrolling regions.
  const leftPinnedIds = columnPinningActive
    ? table.getLeftVisibleLeafColumns().map((column) => column.id)
    : [];
  const rightPinnedIds = columnPinningActive
    ? table.getRightVisibleLeafColumns().map((column) => column.id)
    : [];

  const headerRowCount = table.getHeaderGroups().length;

  const { headerRowRefs, headerRowTops } = useHeaderRowTops(
    headerRowCount,
    resolvedColumns,
  );

  const isBidirectionalScroll = bidirectionalScroll !== undefined;

  const headerHeight = useStickyHeaderHeight(
    isBidirectionalScroll,
    headerRowRefs,
    headerRowCount,
    resolvedColumns,
  );

  const { headerCellRefs, pinnedOffsets } = usePinnedOffsets(
    leftPinnedIds,
    rightPinnedIds,
    resolvedColumns,
  );

  // TanStack computes drag deltas from the column's believed size, which
  // falls back to a 150px default for columns sized by the browser's table
  // layout — the first drag would snap such a column to ~150px. Right
  // before a drag starts, every still-unsized visible leaf column is
  // seeded with its rendered width: the dragged one so resizing tracks
  // from its real width, and the others so they stay frozen while only
  // the table width follows the drag (see hasResizedColumns).
  // (column.columnDef is TanStack's merged copy, so consumer defs are
  // never mutated.)
  const startColumnResize = (
    header: Header<TData, unknown>,
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
  ): void => {
    for (const column of table.getVisibleLeafColumns()) {
      if (columnSizing[column.id] === undefined) {
        const width =
          headerCellRefs.current[column.id]?.getBoundingClientRect().width;

        if (width) {
          column.columnDef.size = Math.round(width);
        }
      }
    }

    header.getResizeHandler()(event);
  };

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
  ): CSSProperties | undefined => {
    if (pinned === 'left') {
      return { left: pinnedOffsets.left[columnId] ?? 0 };
    }

    if (pinned === 'right') {
      return { right: pinnedOffsets.right[columnId] ?? 0 };
    }

    return undefined;
  };

  // Fixed layout enforces exact widths — clip overflowing content
  // (unbreakable strings would otherwise paint over the neighbors).
  const clipCellSx =
    tableLayout === 'fixed'
      ? ({ overflow: 'hidden', textOverflow: 'ellipsis' } as const)
      : undefined;

  // Body cell styles: the fixed-layout clip plus, for pinned cells, the
  // sticky positioning. The solid background hides the columns scrolling
  // underneath; row hover is overlaid as a gradient so the cell stays
  // opaque. (Header cells get their stickiness and background from MUI's
  // stickyHeader instead.)
  const getBodyCellSx = (
    pinned: ColumnPinningPosition,
    columnId: string,
  ): SxProps<Theme> | undefined => {
    if (!pinned) {
      return clipCellSx;
    }

    return (theme) => ({
      ...clipCellSx,
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

  // Cell props matching the default body cells — meta alignment plus the
  // pinned sticky styles. Shared with custom renderRow rows through the
  // row context so they keep pinning parity.
  const getCellProps = (cell: Cell<TData, unknown>): DataTableCellProps => {
    const pinned = cell.column.getIsPinned();

    return {
      align: getColumnMeta(cell.column.columnDef.meta)?.align,
      style: getPinnedOffsetStyle(pinned, cell.column.id),
      sx: getBodyCellSx(pinned, cell.column.id),
    };
  };

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 5,
    // The default measurement reads only the <tr> carrying the measure
    // ref, but a logical row renders as several <tr>s (data row + divider
    // row + optional detail row from renderRow) — see measureRowGroup.
    measureElement: measureRowGroup,
  });

  // Edge-triggered infinite scroll (LogsTable parity): the top edge loads
  // newer rows, the bottom edge loads older ones, and the scroll position
  // is held steady while newer rows are prepended. Inert unless the
  // bidirectionalScroll prop is set.
  useBidirectionalScroll({
    enabled: isBidirectionalScroll,
    scrollContainerRef,
    virtualizer,
    rowCount: rows.length,
    hasNewer: bidirectionalScroll?.hasNewer,
    hasOlder: bidirectionalScroll?.hasOlder,
    isLoadingNewer: bidirectionalScroll?.isLoadingNewer,
    isLoadingOlder: bidirectionalScroll?.isLoadingOlder,
    onLoadNewer: bidirectionalScroll?.onLoadNewer ?? NOOP,
    onLoadOlder: bidirectionalScroll?.onLoadOlder ?? NOOP,
    resetKey: bidirectionalScroll?.resetKey,
  });

  const { pageIndex } = table.getState().pagination;

  // Bring the new page into view from the top whenever the page changes.
  useEffect(() => {
    virtualizer.scrollToOffset(0);
  }, [pageIndex, virtualizer]);

  const contextValue: DataTableContextValue<TData> = {
    table,
    data,
    rows,
    totalRowCount,
    columnCount,
    icons,
    isLoading,
    emptyMessage,
    tableLayout,
    enableColumnResizing,
    enableColumnMenu,
    enableExport,
    exportFilename,
    additionalExportColumns,
    disablePagination,
    pageSizeOptions,
    footerLeft,
    bidirectionalScroll,
    renderLoading,
    renderRow,
    filters,
    onFiltersChange: handleFiltersChange,
    renderFilterPanel,
    activeFilterCount,
    search,
    onSearchChange: handleSearchChange,
    columnPanel,
    setColumnPanel,
    closeColumnPanel,
    openFilterPanel,
    openManageColumnsPanel,
    toolbarFilterButtonRef,
    toolbarManageColumnsButtonRef,
    headerRowRefs,
    headerCellRefs,
    headerRowTops,
    headerHeight,
    isPinnedEdge,
    getPinnedOffsetStyle,
    getCellProps,
    hasResizedColumns,
    startColumnResize,
    virtualizer,
  };

  return (
    <DataTableProvider value={contextValue}>
      <Box sx={{ width: '100%' }}>
        {showToolbar && <DataTableToolbar />}
        <TableContainer
          ref={scrollContainerRef}
          // `width: 0` keeps the table's width from propagating to the
          // page (inside flex/grid parents a wide — e.g. drag-resized —
          // table would otherwise push the ancestors apart instead of
          // scrolling), while `minWidth: 100%` still stretches the
          // container to fill whatever width the parent actually has.
          sx={{ maxHeight, width: 0, minWidth: '100%' }}
        >
          <Table
            stickyHeader
            sx={{ minWidth, tableLayout }}
            // With explicit column widths — set up front (numeric
            // meta.width) or by a resize drag — the table is sized to the
            // sum of the column widths, so a wide column adds horizontal
            // scroll instead of shrinking its neighbors — but never below
            // the container width, so narrowing columns can't leave a gap
            // on the right. Inline style — it changes on every drag frame.
            style={
              hasExplicitColumnSizes
                ? { width: `max(${table.getTotalSize()}px, 100%)` }
                : undefined
            }
            aria-label='data table'
          >
            <DataTableHead />
            <DataTableBody />
          </Table>
        </TableContainer>
        <DataTablePanels />
        <DataTableFooter />
      </Box>
    </DataTableProvider>
  );
}
