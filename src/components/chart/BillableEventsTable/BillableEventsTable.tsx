import { Box, TableCell, TableRow } from '@mui/material';
import {
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import React, { useEffect, useMemo, useState, type ReactNode } from 'react';

import { DataTable } from '../../DataTable/DataTable';
import type {
  DataTableExportColumn,
  DataTableRowContext,
} from '../../DataTable';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventColumn,
  type BillableEventsTableProps,
  type BillableEventsTableRow,
} from './BillableEventsTable.types';
import { billableEventsExportRecord } from './billableEventsExportRecord';
import { BrandDetailsPanel } from './BrandDetailsPanel';
import { formatBillableMetric } from './format';
import { useBillableSort } from './useBillableSort.hook';

type Row = BillableEventsTableRow & Record<string, unknown>;

const DIRECT_KEYS = ['customerName', 'brand'];
const RIGHT_ALIGN = { align: 'right' } as const;

const CUSTOMER_COLUMN: ColumnDef<Row, unknown> = {
  id: 'customerName',
  accessorFn: (row) => row.customerName ?? '',
  header: 'Customer Name',
  enableSorting: true,
  enableColumnFilter: false,
  cell: ({ row }) => row.original.customerName ?? '—',
};

// A metric column: exports the raw count, shows the formatted one (or the host's slot).
function metricColumn(
  column: BillableEventColumn,
  columnSlots: BillableEventsTableProps['columnSlots'],
): ColumnDef<Row, unknown> {
  return {
    id: column.key,
    accessorFn: (row) => row.metrics[column.key] ?? 0,
    header: column.label,
    enableSorting: true,
    // Ascending first, as the old table sorted; TanStack starts numbers descending.
    sortDescFirst: false,
    enableColumnFilter: false,
    meta: RIGHT_ALIGN,
    cell: ({ row }) =>
      columnSlots?.[column.key]
        ? columnSlots[column.key](row.original)
        : formatBillableMetric(row.original.metrics[column.key]),
  };
}

export const BillableEventsTable: React.FC<BillableEventsTableProps> = ({
  data,
  isLoading,
  isFetching,
  visibleProducts,
  onSortedDataChange,
  columnSlots,
  topLevelColumns = [],
  showCustomerColumn = true,
  enableExport = false,
  enableJsonExport = false,
  exportFilename,
  cspNonce,
}) => {
  const { sortKey, sortDir, setSort, sortedData } =
    useBillableSort<BillableEventsTableRow>(data, DIRECT_KEYS, 'brand');

  const [expandedBrandUuid, setExpandedBrandUuid] = useState<string | null>(
    null,
  );

  useEffect(() => {
    onSortedDataChange?.(sortedData);
  }, [sortedData, onSortedDataChange]);

  const columns = useMemo<Array<ColumnDef<Row, unknown>>>(() => {
    const products = visibleProducts ?? Object.values(BillableProduct);
    const topLevelKeys = new Set(topLevelColumns.map((column) => column.key));

    return [
      ...(showCustomerColumn ? [CUSTOMER_COLUMN] : []),
      {
        id: 'brand',
        accessorKey: 'brand',
        header: 'Brand Name',
        enableSorting: true,
        enableColumnFilter: false,
      },
      ...topLevelColumns.map((column) => metricColumn(column, columnSlots)),
      ...BILLABLE_PRODUCTS.filter((product) =>
        products.includes(product.product),
      )
        .map((product) => ({
          product,
          columns: product.columns.filter(
            (column) => !topLevelKeys.has(column.key),
          ),
        }))
        .filter(({ columns: productColumns }) => productColumns.length > 0)
        .map(({ product, columns: productColumns }) => ({
          id: `product:${product.product}`,
          header: product.label,
          columns: productColumns.map((column) =>
            metricColumn(column, columnSlots),
          ),
        })),
    ];
  }, [visibleProducts, topLevelColumns, showCustomerColumn, columnSlots]);

  // The expanded panel's identifiers, which no column shows.
  const additionalExportColumns = useMemo<Array<DataTableExportColumn<Row>>>(
    () => [
      ...(showCustomerColumn
        ? [
            {
              header: 'Customer UUID',
              value: (row: Row) => row.customerUuid ?? '',
            },
          ]
        : []),
      { header: 'Brand UUID', value: (row: Row) => row.brandUuid },
    ],
    [showCustomerColumn],
  );

  // The sort hook stays the one source of order, so `onSortedDataChange` and the export agree with
  // the rows shown. A cleared sort flips the direction instead: the table is always sorted.
  const sorting: SortingState = [{ id: sortKey, desc: sortDir === 'desc' }];
  const handleSortingChange = (next: SortingState) => {
    const [active] = next;
    if (active) setSort(active.id, active.desc ? 'desc' : 'asc');
    else setSort(sortKey, sortDir === 'asc' ? 'desc' : 'asc');
  };

  // Whole-row click toggles the brand's details; one row open at a time.
  const renderRow = ({
    row,
    rowProps,
    getCellProps,
  }: DataTableRowContext<Row>): ReactNode => {
    const original = row.original;
    const isExpanded = expandedBrandUuid === original.brandUuid;
    const cells = row.getVisibleCells();

    return (
      <>
        <TableRow
          {...rowProps}
          hover
          onClick={() =>
            setExpandedBrandUuid(isExpanded ? null : original.brandUuid)
          }
          sx={{
            cursor: 'pointer',
            '& > td': { borderBottom: isExpanded ? 'none' : undefined },
          }}
        >
          {cells.map((cell) => (
            <TableCell key={cell.id} {...getCellProps(cell)}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell
              colSpan={cells.length}
              sx={{ py: 0, px: 0, borderTop: 'none', bgcolor: 'grey.50' }}
            >
              <BrandDetailsPanel
                brandUuid={original.brandUuid}
                customerUuid={
                  showCustomerColumn ? original.customerUuid : undefined
                }
                challengePrompts={original.challengePrompts}
                providers={original.providers}
              />
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };

  if (!data?.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data?.length) {
    return <EmptyChartSection />;
  }

  return (
    <Box sx={{ opacity: isFetching ? 0.4 : 1 }}>
      <DataTable<Row>
        data={sortedData as Row[]}
        columns={columns}
        getRowId={(row) => row.brandUuid}
        renderRow={renderRow}
        manualSorting
        sorting={sorting}
        onSortingChange={handleSortingChange}
        disablePagination
        pinFirstColumn={false}
        showToolbar={enableExport}
        enableExport={enableExport}
        enableJsonExport={enableJsonExport}
        exportFilename={exportFilename}
        additionalExportColumns={additionalExportColumns}
        exportRecord={(row) =>
          billableEventsExportRecord(row, {
            visibleProducts,
            topLevelColumns,
            showCustomerColumn,
          })
        }
        cspNonce={cspNonce}
      />
    </Box>
  );
};
