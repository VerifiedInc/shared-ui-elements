import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
import { useBidirectionalScroll } from '../../../hooks/useBidirectionalScroll';

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
  onCopy: (label: string, value: string) => void;
}) {
  return (
    <IconButton
      className='copy-btn'
      size='small'
      onClick={(e) => {
        e.stopPropagation();
        onCopy(label, value);
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

const ROW_HEIGHT_ESTIMATE = 48;

const MONO_SX = { fontFamily: 'monospace' } as const;

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
  const monoSx = { ...MONO_SX, fontSize: '0.8em' };

  const columns = useMemo(
    () => [
      { label: 'Timestamp', width: 230 },
      { label: 'Phone', width: 150 },
      { label: '1-Click UUID', width: 130 },
      { label: 'Source', width: 90 },
      { label: 'Product', width: 140 },
      { label: 'Event', width: isLgAndBelow ? 125 : 200 },
      { label: 'HTTP', align: 'right' as const, width: 75 },
      { label: 'Latency', align: 'right' as const, width: 100 },
      { label: 'Error', width: 140 },
    ],
    [isLgAndBelow],
  );

  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { copy } = useCopyToClipboard({ type: 'text/plain' });
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = async (label: string, value: string) => {
    await copy(value);
    enqueueSnackbar(`${label} copied to clipboard`, 'success');
  };

  const rows = useMemo(() => data?.data ?? [], [data?.data]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ROW_HEIGHT_ESTIMATE,
    overscan: 5,
  });

  useBidirectionalScroll({
    scrollContainerRef,
    virtualizer,
    rowCount: rows.length,
    hasNewer,
    hasOlder,
    isLoadingNewer,
    isLoadingOlder,
    onLoadNewer,
    onLoadOlder,
    resetKey: filterKey,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const getRowKey = (row: LogEntry, index: number) => {
    return `${row.eventTimestamp}-${index}`;
  };

  // If the expanded row is scrolled out of view, collapse it
  useEffect(() => {
    if (!expandedRowKey) {
      return;
    }

    const isVisible = virtualItems.some((virtualItem) => {
      const row = rows[virtualItem.index];
      return getRowKey(row, virtualItem.index) === expandedRowKey;
    });

    if (!isVisible) {
      setExpandedRowKey(null);
    }
  }, [virtualItems, expandedRowKey, rows]);

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;

  const paddingBottom =
    virtualItems.length > 0
      ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
      : 0;

  if (!isLoading && rows.length === 0) {
    return <EmptyChartSection />;
  }

  return (
    <Stack sx={{ width: '100%', flex: 1, minHeight: 0 }}>
      <TableContainer
        component={Paper}
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          scrollbarGutter: 'stable',
          minHeight: 500,
        }}
      >
        <Table
          size='small'
          stickyHeader
          sx={{ minWidth: 1230, tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 32, bgcolor: 'background.paper' }} />
              {columns.map((col) => (
                <TableCell
                  key={col.label}
                  sx={{ textAlign: col.align, width: col.width }}
                >
                  <Typography
                    sx={{ textTransform: 'uppercase' }}
                    variant='subtitle2'
                  >
                    {col.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} sx={{ textAlign: 'center', py: 2 }}>
                  <Typography color='text.secondary'>Loading...</Typography>
                </TableCell>
              </TableRow>
            )}

            {isLoadingNewer && (
              <TableRow
                sx={{
                  position: 'sticky',
                  top: 37,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              >
                <TableCell
                  colSpan={10}
                  sx={{
                    textAlign: 'center',
                    py: 0.75,
                    bgcolor: 'grey.100',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                  >
                    <CircularProgress size={12} />
                    <Typography variant='caption' color='text.secondary'>
                      Loading newer logs
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {paddingTop > 0 && (
              <tr>
                <td
                  style={{ height: paddingTop, padding: 0, border: 'none' }}
                />
              </tr>
            )}

            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const rowKey = getRowKey(row, virtualRow.index);
              const isExpanded = expandedRowKey === rowKey;

              return (
                <React.Fragment key={virtualRow.key}>
                  <TableRow
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    onClick={() =>
                      setExpandedRowKey(isExpanded ? null : rowKey)
                    }
                    hover
                    sx={{
                      cursor: 'pointer',
                      '& > td': {
                        borderBottom: isExpanded ? 'none' : undefined,
                      },
                    }}
                  >
                    <TableCell sx={{ width: 32, px: 1 }}>
                      <Stack
                        alignItems='center'
                        justifyContent='center'
                        height='100%'
                      >
                        <StatusDot
                          statusCode={row.statusCode}
                          errorCode={row.errorCode}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={monoSx}
                      >
                        {formatLogTimestamp(row.eventTimestamp, timeZone)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        '& .copy-btn': { opacity: 0 },
                        '&:hover .copy-btn': { opacity: 1 },
                      }}
                    >
                      <Stack direction='row' alignItems='center'>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={monoSx}
                        >
                          {row.phone ?? '—'}
                        </Typography>
                        {row.phone && (
                          <CopyButton
                            value={row.phone}
                            label='Phone'
                            onCopy={handleCopy}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        '& .copy-btn': { opacity: 0 },
                        '&:hover .copy-btn': { opacity: 1 },
                      }}
                    >
                      <Stack
                        direction='row'
                        alignItems='center'
                        overflow='hidden'
                      >
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          noWrap
                          sx={monoSx}
                        >
                          {truncateUuid(row.uuid)}
                        </Typography>
                        {row.uuid && (
                          <CopyButton
                            value={row.uuid}
                            label='1-Click UUID'
                            onCopy={handleCopy}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.source.toUpperCase()}
                        size='small'
                        variant='filled'
                        sx={{
                          fontWeight: 600,
                          fontSize: 12,
                          minWidth: 40,
                          bgcolor:
                            row.source === 'sdk' ? '#4FC3F7' : 'primary.main',
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        color='text.primary'
                        sx={{ ...monoSx, fontWeight: 500 }}
                      >
                        {PRODUCT_LABELS[row.product]}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <OverflowTooltip text={formatEvent(row)} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography
                        variant='body2'
                        sx={{
                          ...monoSx,
                          color:
                            row.source === 'sdk'
                              ? 'text.secondary'
                              : row.statusCode >= 400
                                ? 'error.main'
                                : 'success.main',
                        }}
                      >
                        {row.source === 'sdk' ? '—' : row.statusCode}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={monoSx}
                      >
                        {row.source === 'sdk' || !row.latencyMs
                          ? '—'
                          : `${row.latencyMs}ms`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {row.errorCode ? (
                        <Typography
                          variant='body2'
                          sx={{ ...monoSx, color: 'error.main' }}
                        >
                          {row.errorCode}
                        </Typography>
                      ) : (
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={monoSx}
                        >
                          —
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        sx={{
                          py: 0,
                          px: 1,
                          borderTop: 'none',
                          bgcolor: 'grey.50',
                        }}
                      >
                        <LogDetailPanel log={row} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}

            {paddingBottom > 0 && (
              <tr>
                <td
                  style={{ height: paddingBottom, padding: 0, border: 'none' }}
                />
              </tr>
            )}

            {isLoadingOlder && (
              <TableRow
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              >
                <TableCell
                  colSpan={10}
                  sx={{
                    textAlign: 'center',
                    py: 0.75,
                    bgcolor: 'grey.100',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                  >
                    <CircularProgress size={12} />
                    <Typography variant='caption' color='text.secondary'>
                      Loading older logs
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
