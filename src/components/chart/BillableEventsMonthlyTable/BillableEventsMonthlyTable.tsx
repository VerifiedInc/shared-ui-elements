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
import { DEFAULT_TIMEZONE } from '../../form/TimezoneInput/timezones';
import {
  BILLABLE_PRODUCTS,
  type BillableEventColumn,
  type BillableEventsMonthlyTableProps,
  type BillableEventsMonthlyTableRow,
} from '../BillableEventsTable/BillableEventsTable.types';
import { useBillableSort } from '../BillableEventsTable/useBillableSort.hook';
import { white } from '../../../styles';

const EMPTY_CHAR = '';
const DIRECT_KEYS = ['month', 'brand', 'integrationType'];

export const BillableEventsMonthlyTable: React.FC<
  BillableEventsMonthlyTableProps
> = ({ data, isLoading, isFetching, product, timezone = DEFAULT_TIMEZONE }) => {
  const { sortKey, sortDir, handleSort, sortedData } =
    useBillableSort<BillableEventsMonthlyTableRow>(data, DIRECT_KEYS, 'month');

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
            <TableCell>{sortLabel('month', 'Month')}</TableCell>
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
          {sortedData.map((row: BillableEventsMonthlyTableRow) => (
            <TableRow key={`${row.brandUuid}-${row.month}`}>
              <TableCell>
                {new Date(row.month).toLocaleDateString(undefined, {
                  month: 'short',
                  year: 'numeric',
                  timeZone: timezone,
                })}
              </TableCell>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.integrationType}</TableCell>
              {columns.map((col: BillableEventColumn) => (
                <TableCell key={col.key} align='right'>
                  {row.metrics[col.key] || EMPTY_CHAR}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
