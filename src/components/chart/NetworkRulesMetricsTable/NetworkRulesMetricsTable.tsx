import { useMemo } from 'react';
import { Box, Chip, Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import type { CellContext, ColumnDef } from '@tanstack/react-table';

import { formatNumberRounded } from '../../../utils/number/formatters';
import { CopyableUuid } from '../../CopyableUuid';
import { DataTable } from '../../DataTable/DataTable';
import { NetworkStatusChip } from '../../NetworkRules/shared';

import type {
  NetworkRulesMetricsTableProps,
  NetworkRulesMetricsTableRow,
} from './NetworkRulesMetricsTable.types';

const SKELETON_ROWS = 4;

export const NETWORK_RULES_METRICS_COLUMN_IDS = {
  name: 'name',
  uuid: 'uuid',
  status: 'status',
  notes: 'notes',
  matches: 'matches',
  conflicts: 'conflicts',
} as const;

function LoadingRows({ columnCount }: Readonly<{ columnCount: number }>) {
  return (
    <>
      {Array.from({ length: SKELETON_ROWS }, (_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }, (_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton variant='text' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

const countCell = ({
  getValue,
}: CellContext<NetworkRulesMetricsTableRow, unknown>): string =>
  formatNumberRounded(getValue<number | undefined>() ?? 0);

// Accessors return what the cell displays, so search and export see the same text; status is the
// exception, its code is what the chip reads. The counts are joined onto the page after the API
// pages it, so no API orders by them: their headers only sort while the table sorts its own rows.
function buildColumns(
  canSortCounts: boolean,
): Array<ColumnDef<NetworkRulesMetricsTableRow, unknown>> {
  return [
    {
      id: NETWORK_RULES_METRICS_COLUMN_IDS.name,
      header: 'Rule Name',
      accessorFn: (rule) => rule.name,
      cell: ({ row }) => {
        const { name, conditions } = row.original;
        return (
          <Stack direction='row' spacing={1} alignItems='center' minWidth={0}>
            <Box
              component='span'
              title={name}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Box>
            <Chip
              size='small'
              label={`${conditions.length} ${conditions.length === 1 ? 'condition' : 'conditions'}`}
            />
          </Stack>
        );
      },
      enableColumnFilter: false,
      enableSorting: true,
      meta: { width: 300 },
    },
    {
      id: NETWORK_RULES_METRICS_COLUMN_IDS.uuid,
      header: 'Rule UUID',
      accessorFn: (rule) => rule.uuid,
      cell: ({ row }) => (
        <CopyableUuid
          uuid={row.original.uuid}
          label='Rule UUID'
          head={8}
          tail={4}
          iconSx={{ fontSize: 14, p: 0.125 }}
        />
      ),
      enableColumnFilter: false,
      meta: { width: 180 },
    },
    {
      id: NETWORK_RULES_METRICS_COLUMN_IDS.status,
      header: 'Status',
      accessorFn: (rule) => rule.status,
      cell: ({ row }) => <NetworkStatusChip status={row.original.status} />,
      enableColumnFilter: false,
      enableSorting: true,
      meta: { width: 180 },
    },
    {
      id: NETWORK_RULES_METRICS_COLUMN_IDS.notes,
      header: 'Notes',
      accessorFn: (rule) => rule.notes ?? '',
      // A note reads as one value, the same chip the rule editor shows it in.
      cell: ({ row }) => row.original.notes ?? '-',
      enableColumnFilter: false,
      meta: { width: 260 },
    },
    {
      id: NETWORK_RULES_METRICS_COLUMN_IDS.matches,
      header: 'Matches',
      accessorFn: (rule) => rule.matches,
      cell: countCell,
      enableColumnFilter: false,
      enableSorting: canSortCounts,
      meta: { width: 120, align: 'right' },
    },
    {
      id: NETWORK_RULES_METRICS_COLUMN_IDS.conflicts,
      header: 'Conflicts',
      accessorFn: (rule) => rule.conflicts,
      cell: countCell,
      enableColumnFilter: false,
      enableSorting: canSortCounts,
      meta: { width: 120, align: 'right' },
    },
  ];
}

/**
 * The brand's network rules for the selected period, each with how often it matched and how often
 * it conflicted. It reads nothing but its props, so the Dashboard and Mission Control both render
 * it from their own endpoint.
 */
export function NetworkRulesMetricsTable({
  data,
  isLoading = false,
  isFetching = false,
  emptyMessage = 'No network rules yet',
  showToolbar = true,
  maxHeight = 520,
  minWidth = 900,
  manualSorting,
  ...listState
}: Readonly<NetworkRulesMetricsTableProps>) {
  const columns = useMemo(() => buildColumns(!manualSorting), [manualSorting]);
  const fillHeight = maxHeight === '100%';

  return (
    <Box
      sx={{
        opacity: isFetching ? 0.4 : 1,
        ...(fillHeight ? { height: '100%', minHeight: 0 } : {}),
      }}
    >
      <DataTable
        data={data}
        columns={columns}
        getRowId={(rule) => rule.uuid}
        isLoading={isLoading}
        initialPageSize={10}
        showToolbar={showToolbar}
        enableColumnMenu
        enableColumnResizing
        enableColumnPinning
        tableLayout='fixed'
        minWidth={minWidth}
        maxHeight={maxHeight}
        emptyMessage={emptyMessage}
        manualSorting={manualSorting}
        renderLoading={(columnCount: number) => (
          <LoadingRows columnCount={columnCount} />
        )}
        {...listState}
      />
    </Box>
  );
}
