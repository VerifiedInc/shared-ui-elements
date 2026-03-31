import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useMemo } from 'react';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import {
  BILLABLE_PRODUCTS,
  type BillableEventColumn,
  type BillableEventsProductTableProps,
  type BillableEventsTableRow,
} from '../BillableEventsTable/BillableEventsTable.types';
import { useBillableSort } from '../BillableEventsTable/useBillableSort.hook';
import { white } from '../../../styles';

const DIRECT_KEYS = ['brand', 'integrationType'];

export const BillableEventsProductTable: React.FC<
  BillableEventsProductTableProps
> = ({ data, isLoading, isFetching, product, columnSlots }) => {
  const { sortKey, sortDir, handleSort, sortedData } =
    useBillableSort<BillableEventsTableRow>(data, DIRECT_KEYS, 'brand');

  const productConfig = useMemo(() => {
    return BILLABLE_PRODUCTS.find((p) => p.product === product);
  }, [product]);

  const columns = useMemo(() => {
    return productConfig?.columns ?? [];
  }, [productConfig]);

  const sortLabel = (
    key: string,
    label: string,
    align: 'left' | 'right' = 'left',
  ) => (
    <TableSortLabel
      active={sortKey === key}
      direction={sortKey === key ? sortDir : 'asc'}
      onClick={() => handleSort(key)}
      sx={align === 'right' ? { flexDirection: 'row' } : undefined}
    >
      {label}
    </TableSortLabel>
  );

  if (!data?.length && isLoading) {
    return <LoadingChartSection />;
  }

  if (!data?.length) {
    return <EmptyChartSection />;
  }

  return (
    <TableContainer component={Paper} sx={{ opacity: isFetching ? 0.4 : 1 }}>
      <Table sx={{ backgroundColor: white }}>
        <TableHead>
          <TableRow>
            <TableCell>{sortLabel('brand', 'Brand')}</TableCell>
            <TableCell>
              {sortLabel('integrationType', 'Integration Type')}
            </TableCell>
            {columns.map((col: BillableEventColumn) => (
              <TableCell key={col.key} align='right'>
                {sortLabel(col.key, col.label, 'right')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: BillableEventsTableRow) => (
            <TableRow key={row.brandUuid}>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.integrationType}</TableCell>
              {columns.map((col: BillableEventColumn) => (
                <TableCell key={col.key} align='right'>
                  {columnSlots?.[col.key]
                    ? columnSlots[col.key](row)
                    : (row.metrics[col.key] ?? 0)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
