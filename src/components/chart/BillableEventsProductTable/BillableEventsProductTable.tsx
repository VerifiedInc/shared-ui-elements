import { Box } from '@mui/material';
import type {
  CellContext,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

import { DataTable } from '../../DataTable/DataTable';
import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import {
  BILLABLE_PRODUCTS,
  type BillableEventsProductTableProps,
  type BillableEventsTableRow,
} from '../BillableEventsTable/BillableEventsTable.types';
import { billableEventsExportRecord } from '../BillableEventsTable/billableEventsExportRecord';
import { formatBillableMetric } from '../BillableEventsTable/format';
import { useBillableSort } from '../BillableEventsTable/useBillableSort.hook';
import { CopyableUuid } from '../../CopyableUuid';

type Row = BillableEventsTableRow & Record<string, unknown>;

const DIRECT_KEYS = ['brand'];
const RIGHT_ALIGN = { align: 'right' } as const;

function BrandUuidCell({
  row,
}: Readonly<CellContext<Row, unknown>>): React.JSX.Element {
  return (
    <CopyableUuid
      uuid={row.original.brandUuid}
      label='Brand UUID'
      variant='button'
      head={6}
      tail={0}
      mono={false}
      iconSx={{ color: 'success.main' }}
      typographyProps={{ variant: 'inherit', color: 'inherit' }}
    />
  );
}

export const BillableEventsProductTable: React.FC<
  BillableEventsProductTableProps
> = ({
  data,
  isLoading,
  isFetching,
  product,
  columnSlots,
  enableExport = false,
  enableJsonExport = false,
  exportFilename,
  cspNonce,
}) => {
  const { sortKey, sortDir, setSort, sortedData } =
    useBillableSort<BillableEventsTableRow>(data, DIRECT_KEYS, 'brand');

  const columns = useMemo<Array<ColumnDef<Row, unknown>>>(() => {
    const productColumns =
      BILLABLE_PRODUCTS.find((entry) => entry.product === product)?.columns ??
      [];

    return [
      {
        id: 'brand',
        accessorKey: 'brand',
        header: 'Brand Name',
        enableSorting: true,
        enableColumnFilter: false,
      },
      {
        id: 'brandUuid',
        // Not sortable, but keeps an accessor so the uuid is exported.
        accessorKey: 'brandUuid',
        header: 'Brand UUID',
        enableColumnFilter: false,
        cell: BrandUuidCell,
      },
      ...productColumns.map((column): ColumnDef<Row, unknown> => ({
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
      })),
    ];
  }, [product, columnSlots]);

  // The sort hook stays the one source of order; a cleared sort flips the direction instead.
  const sorting: SortingState = [{ id: sortKey, desc: sortDir === 'desc' }];
  const handleSortingChange = (next: SortingState) => {
    const [active] = next;
    if (active) setSort(active.id, active.desc ? 'desc' : 'asc');
    else setSort(sortKey, sortDir === 'asc' ? 'desc' : 'asc');
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
        manualSorting
        sorting={sorting}
        onSortingChange={handleSortingChange}
        disablePagination
        pinFirstColumn={false}
        showToolbar={enableExport}
        enableExport={enableExport}
        enableJsonExport={enableJsonExport}
        exportFilename={exportFilename}
        // One product, so its counts sit at the top level, as in the CSV.
        exportRecord={(row) =>
          billableEventsExportRecord(row, {
            visibleProducts: [product],
            topLevelColumns:
              BILLABLE_PRODUCTS.find((entry) => entry.product === product)
                ?.columns ?? [],
            showCustomerColumn: false,
          })
        }
        cspNonce={cspNonce}
      />
    </Box>
  );
};
