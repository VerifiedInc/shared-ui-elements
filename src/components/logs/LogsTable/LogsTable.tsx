import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flexRender, type ColumnDef } from '@tanstack/react-table';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

import { EmptyChartSection } from '../../chart/EmptyChartSection';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { useSnackbar } from '../../Snackbar';
import { formatLogTimestamp } from '../../../utils/date';
import type { LogEntry, LogsResponse } from '../types';
import { PRODUCT_LABELS } from '../constants';
import { LogDetailPanel } from './LogDetailPanel';
import { DataTable } from '../../DataTable/DataTable';

interface LogsTableProps {
  data?: LogsResponse;
  isLoading: boolean;
  hasOlder?: boolean;
  hasNewer?: boolean;
  isLoadingOlder?: boolean;
  isLoadingNewer?: boolean;
  onLoadNewer: () => void;
  onLoadOlder: () => void;
  /** A value that changes whenever the active filters change (e.g. serialised filter string) */
  filterKey?: string;
  timeZone?: string;
}

function StatusDot({
  statusCode,
  errorCode,
}: {
  statusCode: number;
  errorCode: string | null;
}) {
  let color = 'grey.400';

  if (errorCode ?? statusCode >= 400) {
    color = 'error.main';
  } else if (statusCode >= 200 && statusCode < 300) {
    color = 'success.main';
  }

  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: color,
        flexShrink: 0,
      }}
    />
  );
}

function CopyButton({
  value,
  label,
  onCopy,
}: {
  value: string;
  label: string;
  onCopy: (label: string, value: string) => Promise<void>;
}) {
  return (
    <IconButton
      className='copy-btn'
      size='small'
      onClick={(e) => {
        e.stopPropagation();
        void onCopy(label, value);
      }}
      sx={{ p: 0.25, ml: 0.5 }}
    >
      <ContentCopy sx={{ fontSize: 13 }} />
    </IconButton>
  );
}

function truncateUuid(uuid: string | null): string {
  if (!uuid) {
    return '—';
  }

  if (uuid.length <= 12) {
    return uuid;
  }

  return `${uuid.slice(0, 4)}…${uuid.slice(-4)}`;
}

function formatEvent(row: LogEntry): string {
  if (row.source === 'sdk') {
    return row.path;
  }

  return `${row.method} /${row.path}`;
}

function OverflowTooltip({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) setOverflow(el.scrollWidth > el.clientWidth);
  }, [text]);

  return (
    <Tooltip title={overflow ? text : ''} placement='top'>
      <Typography
        ref={ref}
        variant='body2'
        noWrap
        sx={{
          fontSize: '0.8em',
          color: 'text.primary',
          fontFamily: 'monospace',
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
}

function OverflowChip({
  label,
  ...chipProps
}: { label: string } & Omit<React.ComponentProps<typeof Chip>, 'label'>) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const labelEl = ref.current?.querySelector('.MuiChip-label');
    if (labelEl) setOverflow(labelEl.scrollWidth > labelEl.clientWidth);
  }, [label]);

  return (
    <Tooltip title={overflow ? label : ''} placement='top'>
      <Chip
        ref={ref}
        label={label}
        {...chipProps}
        sx={{
          ...chipProps.sx,
          maxWidth: '100%',
          '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
        }}
      />
    </Tooltip>
  );
}

const ROW_HEIGHT_ESTIMATE = 48;

const MONO_SX = { fontFamily: 'monospace', fontSize: '0.8em' } as const;

const getRowId = (row: LogEntry, index: number): string =>
  `${row.eventTimestamp}-${index}`;

interface ColumnOptions {
  timeZone?: string;
  eventWidth: number;
  onCopy: (label: string, value: string) => Promise<void>;
}

function createColumns({
  timeZone,
  eventWidth,
  onCopy,
}: ColumnOptions): Array<ColumnDef<LogEntry, unknown>> {
  return [
    {
      id: 'status',
      header: '',
      meta: { width: 32 },
      cell: ({ row }) => (
        <Stack alignItems='center' justifyContent='center' height='100%'>
          <StatusDot
            statusCode={row.original.statusCode}
            errorCode={row.original.errorCode}
          />
        </Stack>
      ),
    },
    {
      id: 'timestamp',
      header: 'Timestamp',
      meta: { width: 230 },
      cell: ({ row }) => (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ ...MONO_SX, whiteSpace: 'nowrap' }}
        >
          {formatLogTimestamp(row.original.eventTimestamp, timeZone)}
        </Typography>
      ),
    },
    {
      id: 'phone',
      header: 'Phone',
      meta: { width: 150 },
      cell: ({ row }) => (
        <Stack direction='row' alignItems='center'>
          <Typography variant='body2' color='text.secondary' sx={MONO_SX}>
            {row.original.phone ?? '—'}
          </Typography>
          {row.original.phone && (
            <CopyButton
              value={row.original.phone}
              label='Phone'
              onCopy={onCopy}
            />
          )}
        </Stack>
      ),
    },
    {
      id: 'uuid',
      header: '1-Click UUID',
      meta: { width: 130 },
      cell: ({ row }) => (
        <Stack direction='row' alignItems='center' overflow='hidden'>
          <Typography
            variant='body2'
            color='text.secondary'
            noWrap
            sx={MONO_SX}
          >
            {truncateUuid(row.original.uuid)}
          </Typography>
          {row.original.uuid && (
            <CopyButton
              value={row.original.uuid}
              label='1-Click UUID'
              onCopy={onCopy}
            />
          )}
        </Stack>
      ),
    },
    {
      id: 'source',
      header: 'Source',
      meta: { width: 90 },
      cell: ({ row }) => (
        <Chip
          label={row.original.source.toUpperCase()}
          size='small'
          variant='filled'
          sx={{
            fontWeight: 600,
            fontSize: 12,
            minWidth: 40,
            bgcolor: row.original.source === 'sdk' ? '#4FC3F7' : 'primary.main',
            color: 'white',
          }}
        />
      ),
    },
    {
      id: 'product',
      header: 'Product',
      meta: { width: 140 },
      cell: ({ row }) => (
        <OverflowChip
          label={PRODUCT_LABELS[row.original.product]}
          variant='outlined'
          sx={{ fontSize: 13, fontWeight: 600, minWidth: 110 }}
        />
      ),
    },
    {
      id: 'event',
      header: 'Event',
      meta: { width: eventWidth },
      cell: ({ row }) => <OverflowTooltip text={formatEvent(row.original)} />,
    },
    {
      id: 'http',
      header: 'HTTP',
      meta: { width: 75, align: 'right' },
      cell: ({ row }) => {
        const { source, statusCode } = row.original;
        let color = 'success.main';
        if (source === 'sdk') color = 'text.secondary';
        else if (statusCode >= 400) color = 'error.main';
        return (
          <Typography variant='body2' sx={{ ...MONO_SX, color }}>
            {source === 'sdk' ? '—' : statusCode}
          </Typography>
        );
      },
    },
    {
      id: 'latency',
      header: 'Latency',
      meta: { width: 100, align: 'right' },
      cell: ({ row }) => (
        <Typography variant='body2' color='text.secondary' sx={MONO_SX}>
          {row.original.source === 'sdk' || !row.original.latencyMs
            ? '—'
            : `${row.original.latencyMs}ms`}
        </Typography>
      ),
    },
    {
      id: 'error',
      header: 'Error',
      meta: { width: 140 },
      cell: ({ row }) =>
        row.original.errorCode ? (
          <Typography variant='body2' sx={{ ...MONO_SX, color: 'error.main' }}>
            {row.original.errorCode}
          </Typography>
        ) : (
          <Typography variant='body2' color='text.secondary' sx={MONO_SX}>
            —
          </Typography>
        ),
    },
  ];
}

export function LogsTable({
  data,
  isLoading,
  hasOlder,
  hasNewer,
  isLoadingOlder,
  isLoadingNewer,
  onLoadNewer,
  onLoadOlder,
  filterKey,
  timeZone,
}: LogsTableProps) {
  const theme = useTheme();
  const isLgAndBelow = useMediaQuery(theme.breakpoints.down('xl'));
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const { copy } = useCopyToClipboard({ type: 'text/plain' });
  const { enqueueSnackbar } = useSnackbar();

  const rows = useMemo(() => data?.data ?? [], [data?.data]);

  const columns = useMemo(
    () =>
      createColumns({
        timeZone,
        eventWidth: isLgAndBelow ? 125 : 200,
        onCopy: async (label, value) => {
          await copy(value);
          enqueueSnackbar(`${label} copied to clipboard`, 'success');
        },
      }),
    [copy, enqueueSnackbar, isLgAndBelow, timeZone],
  );

  if (!isLoading && rows.length === 0) {
    return <EmptyChartSection />;
  }

  return (
    <Stack sx={{ width: '100%', flex: 1, minHeight: 500 }}>
      <DataTable<LogEntry>
        data={rows}
        columns={columns}
        getRowId={getRowId}
        // Rows already on screen stay while a filter refetches; the loading rows are only for the first load.
        isLoading={isLoading && rows.length === 0}
        disableSorting
        disablePagination
        pinFirstColumn={false}
        tableLayout='fixed'
        minWidth={1230}
        maxHeight='100%'
        estimateRowHeight={ROW_HEIGHT_ESTIMATE}
        bidirectionalScroll={{
          hasNewer,
          hasOlder,
          isLoadingNewer,
          isLoadingOlder,
          onLoadNewer,
          onLoadOlder,
          resetKey: filterKey,
          loadingNewerLabel: 'Loading newer logs',
          loadingOlderLabel: 'Loading older logs',
        }}
        renderRow={({ row, rowProps, getCellProps }) => {
          const isExpanded = expandedRowId === row.id;
          const cells = row.getVisibleCells();

          return (
            <>
              <TableRow
                {...rowProps}
                hover
                onClick={() => setExpandedRowId(isExpanded ? null : row.id)}
                sx={{
                  cursor: 'pointer',
                  '& > td': { borderBottom: isExpanded ? 'none' : undefined },
                  '& .copy-btn': { opacity: 0 },
                  '& td:hover .copy-btn': { opacity: 1 },
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
                    sx={{ py: 0, px: 1, borderTop: 'none', bgcolor: 'grey.50' }}
                  >
                    <LogDetailPanel log={row.original} />
                  </TableCell>
                </TableRow>
              )}
            </>
          );
        }}
      />
    </Stack>
  );
}
