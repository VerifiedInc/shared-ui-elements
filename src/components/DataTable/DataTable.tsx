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
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';

import type {
  DataTableColumnMeta,
  DataTableData,
  DataTableProps,
} from './DataTable.types';

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_ROW_HEIGHT_ESTIMATE = 53;

/** Turns an object key into a readable header label, e.g. `createdAt` → `Created At`. */
function formatColumnLabel(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Default cell formatting for values of unknown shape. */
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

/** Builds default column definitions from the keys of the first data row. */
function inferColumns<TData extends DataTableData>(
  data: TData[],
): Array<ColumnDef<TData, unknown>> {
  const [firstRow] = data;

  if (!firstRow) {
    return [];
  }

  return Object.keys(firstRow).map((key) => ({
    id: key,
    accessorFn: (row: TData) => row[key],
    header: formatColumnLabel(key),
    cell: (info) => formatCellValue(info.getValue()),
    // Zero-config tables keep every inferred column sortable.
    enableSorting: true,
  }));
}

function getColumnMeta(meta: unknown): DataTableColumnMeta | undefined {
  return meta as DataTableColumnMeta | undefined;
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
  footerLeft,
  estimateRowHeight = DEFAULT_ROW_HEIGHT_ESTIMATE,
  maxHeight = 600,
  tableLayout = 'auto',
  emptyMessage = 'No data to display.',
  isLoading = false,
  renderLoading,
}: Readonly<DataTableProps<TData>>) {
  const [internalSorting, setInternalSorting] =
    useState<SortingState>(initialSorting);

  // Controlled when the consumer passes a sorting prop, internal otherwise.
  const sorting = controlledSorting ?? internalSorting;

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next = typeof updater === 'function' ? updater(sorting) : updater;

    if (!controlledSorting) {
      setInternalSorting(next);
    }

    onSortingChange?.(next);
  };
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: initialPageSize,
    },
  );

  // Controlled when the consumer passes a pagination prop (e.g. to reset
  // the page when filters change), internal otherwise.
  const pagination = controlledPagination ?? internalPagination;

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const next = typeof updater === 'function' ? updater(pagination) : updater;

    if (!controlledPagination) {
      setInternalPagination(next);
    }

    onPaginationChange?.(next);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const resolvedColumns = useMemo(
    () => columns ?? inferColumns(data),
    [columns, data],
  );

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: {
      ...(disableSorting ? {} : { sorting }),
      ...(disablePagination ? {} : { pagination }),
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
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
  const columnCount = table.getAllLeafColumns().length || 1;

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
                  const canSort = column.getCanSort();
                  const sortDirection = column.getIsSorted();

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

                  return (
                    <TableCell
                      key={header.id}
                      align={meta?.align ?? (isGroupHeader ? 'center' : 'left')}
                      colSpan={header.colSpan > 1 ? header.colSpan : undefined}
                      rowSpan={rowSpan > 1 ? rowSpan : undefined}
                      sortDirection={sortDirection}
                      sx={{
                        width: meta?.width,
                        // Group labels sit borderless above their
                        // sub-columns, matching BillableEventsTable.
                        ...(isGroupHeader ? { borderBottom: 'none' } : {}),
                        ...(rowIndex > 0
                          ? { top: headerRowTops[rowIndex] ?? 0 }
                          : {}),
                      }}
                    >
                      {canSort ? (
                        <TableSortLabel
                          active={sortDirection !== false}
                          direction={
                            sortDirection === false ? 'asc' : sortDirection
                          }
                          // Blocks re-sorting while a page is being
                          // fetched (relevant with manualSorting).
                          disabled={isLoading}
                          onClick={column.getToggleSortingHandler()}
                        >
                          {label}
                        </TableSortLabel>
                      ) : (
                        label
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

                      return (
                        <TableCell key={cell.id} align={meta?.align}>
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
            />
          )}
        </Stack>
      )}
    </Box>
  );
}
