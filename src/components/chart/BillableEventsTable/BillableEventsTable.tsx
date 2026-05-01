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
import React, { useEffect, useMemo } from 'react';

import { EmptyChartSection } from '../EmptyChartSection';
import { LoadingChartSection } from '../LoadingChartSection';
import {
  BILLABLE_PRODUCTS,
  BillableProduct,
  type BillableEventColumn,
  type BillableEventsTableProps,
  type BillableEventsTableRow,
} from './BillableEventsTable.types';
import { useBillableSort } from './useBillableSort.hook';
import { CopyableUuid } from '../../CopyableUuid';
import { LazyBrandChallengePromptsTooltip } from '../../BrandChallengePromptsTooltip';
import { white } from '../../../styles';

const DIRECT_KEYS = ['brand', 'integrationType'];

export const BillableEventsTable: React.FC<BillableEventsTableProps> = ({
  data,
  isLoading,
  isFetching,
  visibleProducts,
  onSortedDataChange,
  columnSlots,
  topLevelColumns = [],
}) => {
  const { sortKey, sortDir, handleSort, sortedData } =
    useBillableSort<BillableEventsTableRow>(data, DIRECT_KEYS, 'brand');

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
            <TableCell rowSpan={2}>
              {sortLabel('brand', 'Brand Name')}
            </TableCell>
            <TableCell rowSpan={2}>Brand UUID</TableCell>
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
          {sortedData.map((row: BillableEventsTableRow) => (
            <TableRow key={row.brandUuid}>
              <TableCell>
                <LazyBrandChallengePromptsTooltip
                  prompts={row.challengePrompts}
                >
                  {row.brand}
                </LazyBrandChallengePromptsTooltip>
              </TableCell>
              <TableCell>
                <CopyableUuid
                  uuid={row.brandUuid}
                  label='Brand UUID'
                  variant='button'
                  head={6}
                  tail={0}
                  mono={false}
                  iconSx={{ color: 'success.main' }}
                  typographyProps={{ variant: 'inherit', color: 'inherit' }}
                />
              </TableCell>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
