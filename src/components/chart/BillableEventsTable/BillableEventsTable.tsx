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
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventColumn,
  type BillableEventsTableProps,
  type BillableEventsTableRow,
} from './BillableEventsTable.types';
import { BrandDetailsPanel } from './BrandDetailsPanel';
import { useBillableSort } from './useBillableSort.hook';
import { white } from '../../../styles';

const DIRECT_KEYS = ['customerName', 'brand', 'integrationType'];

export const BillableEventsTable: React.FC<BillableEventsTableProps> = ({
  data,
  isLoading,
  isFetching,
  visibleProducts,
  onSortedDataChange,
  columnSlots,
  topLevelColumns = [],
  showCustomerColumn = true,
}) => {
  const { sortKey, sortDir, handleSort, sortedData } =
    useBillableSort<BillableEventsTableRow>(data, DIRECT_KEYS, 'brand');

  const [expandedBrandUuid, setExpandedBrandUuid] = useState<string | null>(
    null,
  );

  useEffect(() => {
    onSortedDataChange?.(sortedData);
  }, [sortedData, onSortedDataChange]);

  const activeProducts = useMemo(() => {
    const products = visibleProducts ?? Object.values(BillableProduct);
    return BILLABLE_PRODUCTS.filter((p) => products.includes(p.product));
  }, [visibleProducts]);

  const topLevelColumnKeys = useMemo(
    () => new Set(topLevelColumns.map((c) => c.key)),
    [topLevelColumns],
  );

  const allColumns = useMemo(() => {
    return activeProducts
      .flatMap((p) => p.columns)
      .filter((c) => !topLevelColumnKeys.has(c.key));
  }, [activeProducts, topLevelColumnKeys]);

  // Brand Name + Integration Type = 2 fixed cells, plus Customer Name when shown.
  const fixedColumnCount = 2 + (showCustomerColumn ? 1 : 0);
  const totalColumnCount =
    fixedColumnCount + topLevelColumns.length + allColumns.length;

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
          {/* Product group header row */}
          <TableRow>
            {showCustomerColumn && (
              <TableCell rowSpan={2}>
                {sortLabel('customerName', 'Customer Name')}
              </TableCell>
            )}
            <TableCell rowSpan={2}>
              {sortLabel('brand', 'Brand Name')}
            </TableCell>
            <TableCell rowSpan={2}>
              {sortLabel('integrationType', 'Integration Type')}
            </TableCell>
            {topLevelColumns.map((col) => (
              <TableCell key={col.key} rowSpan={2}>
                {sortLabel(col.key, col.label)}
              </TableCell>
            ))}
            {activeProducts.map((product) => {
              const visibleCount = product.columns.filter(
                (c) => !topLevelColumnKeys.has(c.key),
              ).length;
              if (visibleCount === 0) return null;
              return (
                <TableCell
                  key={product.product}
                  colSpan={visibleCount}
                  align='center'
                  sx={{ fontWeight: 'bold', borderBottom: 'none' }}
                >
                  {product.label}
                </TableCell>
              );
            })}
          </TableRow>
          {/* Event column header row */}
          <TableRow>
            {allColumns.map((col: BillableEventColumn) => (
              <TableCell key={col.key} align='right'>
                {sortLabel(col.key, col.label, 'right')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: BillableEventsTableRow) => {
            const isExpanded = expandedBrandUuid === row.brandUuid;
            return (
              <Fragment key={row.brandUuid}>
                <TableRow
                  hover
                  onClick={() =>
                    setExpandedBrandUuid(isExpanded ? null : row.brandUuid)
                  }
                  sx={{
                    cursor: 'pointer',
                    '& > td': {
                      borderBottom: isExpanded ? 'none' : undefined,
                    },
                  }}
                >
                  {showCustomerColumn && (
                    <TableCell>{row.customerName ?? '—'}</TableCell>
                  )}
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.integrationType}</TableCell>
                  {topLevelColumns.map((col: BillableEventColumn) => (
                    <TableCell key={col.key}>
                      {columnSlots?.[col.key]
                        ? columnSlots[col.key](row)
                        : (row.metrics[col.key] ?? 0)}
                    </TableCell>
                  ))}
                  {allColumns.map((col: BillableEventColumn) => (
                    <TableCell key={col.key} align='right'>
                      {columnSlots?.[col.key]
                        ? columnSlots[col.key](row)
                        : (row.metrics[col.key] ?? 0)}
                    </TableCell>
                  ))}
                </TableRow>
                {isExpanded && (
                  <TableRow>
                    <TableCell
                      colSpan={totalColumnCount}
                      sx={{
                        py: 0,
                        px: 0,
                        borderTop: 'none',
                        bgcolor: 'grey.50',
                      }}
                    >
                      <BrandDetailsPanel
                        brandUuid={row.brandUuid}
                        customerUuid={
                          showCustomerColumn ? row.customerUuid : undefined
                        }
                        challengePrompts={row.challengePrompts}
                        providers={row.providers}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
