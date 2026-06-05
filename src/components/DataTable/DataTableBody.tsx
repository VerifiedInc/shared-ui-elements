import React from 'react';

import { flexRender } from '@tanstack/react-table';
import {
  CircularProgress,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { useDataTableContext } from './DataTable.context';

interface DataTableEdgeLoadingRowProps {
  edge: 'top' | 'bottom';
  /** Sticky offset of the top variant — the measured header height. */
  top?: number;
  columnCount: number;
  label: string;
}

/**
 * Sticky in-flight indicator pinned to an edge of the scroll container
 * while a bidirectional page loads. The top variant offsets below the
 * sticky header rows; the bottom variant hugs the container's bottom edge.
 */
function DataTableEdgeLoadingRow({
  edge,
  top = 0,
  columnCount,
  label,
}: Readonly<DataTableEdgeLoadingRowProps>) {
  return (
    <TableRow
      sx={{
        position: 'sticky',
        ...(edge === 'top' ? { top } : { bottom: 0 }),
        // Above the pinned body cells (zIndex 1), below the pinned header
        // cells (zIndex 3).
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <TableCell
        colSpan={columnCount}
        sx={{
          textAlign: 'center',
          py: 0.75,
          bgcolor: 'grey.100',
          ...(edge === 'top'
            ? { borderBottom: '1px solid' }
            : { borderTop: '1px solid' }),
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
            {label}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

/**
 * Table body: the loading / empty states, the bidirectional-scroll edge
 * indicators, the virtualizer padding rows and the virtualized data rows
 * (default markup or the consumer's `renderRow`).
 */
export function DataTableBody() {
  const {
    rows,
    columnCount,
    isLoading,
    renderLoading,
    emptyMessage,
    bidirectionalScroll,
    headerHeight,
    renderRow,
    getCellProps,
    virtualizer,
  } = useDataTableContext();

  const virtualItems = virtualizer.getVirtualItems();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;

  const paddingBottom =
    virtualItems.length > 0
      ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
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

      {bidirectionalScroll?.isLoadingNewer && (
        <DataTableEdgeLoadingRow
          edge='top'
          top={headerHeight}
          columnCount={columnCount}
          label={bidirectionalScroll.loadingNewerLabel ?? 'Loading newer rows'}
        />
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
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} {...getCellProps(cell)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
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
              ? renderRow({
                  row,
                  virtualRow,
                  rowProps,
                  getCellProps,
                  renderDefaultRow,
                })
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

      {bidirectionalScroll?.isLoadingOlder && (
        <DataTableEdgeLoadingRow
          edge='bottom'
          columnCount={columnCount}
          label={bidirectionalScroll.loadingOlderLabel ?? 'Loading older rows'}
        />
      )}
    </TableBody>
  );
}
