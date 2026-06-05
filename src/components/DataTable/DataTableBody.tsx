import React, { useEffect, useRef } from 'react';

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
import { VIRTUAL_BOUNDARY_ATTRIBUTE } from './DataTable.utils';

// Stops the row-group measurement walk (see measureRowGroup) at the rows
// that don't belong to any virtual row — padding and edge indicators.
const virtualBoundaryProps = { [VIRTUAL_BOUNDARY_ATTRIBUTE]: '' };

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
      {...virtualBoundaryProps}
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

  // The virtualizer's own ResizeObserver only watches the data-index row,
  // so a sibling row resizing underneath it (e.g. a Collapse detail panel
  // expanding) would go unnoticed and leave a stale group height — the
  // scroll then snaps once the stale row leaves the window. This observer
  // watches the sibling rows of every rendered group and re-measures the
  // owning row when one of them resizes. It fires on every frame of a
  // Collapse animation, so the virtualizer tracks the real height (and
  // compensates the scroll offset for rows above the viewport) throughout.
  const observedSiblingsRef = useRef<Set<Element>>(new Set());
  const siblingObserverRef = useRef<ResizeObserver | null>(null);

  const getSiblingObserver = (): ResizeObserver | null => {
    if (!siblingObserverRef.current && typeof ResizeObserver !== 'undefined') {
      siblingObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Walk back to the data-index row that owns the resized sibling.
          let owner = entry.target.previousElementSibling;
          while (owner && !owner.hasAttribute('data-index')) {
            owner = owner.previousElementSibling;
          }

          if (owner?.isConnected) {
            virtualizer.measureElement(owner);
          }
        }
      });
    }

    return siblingObserverRef.current;
  };

  useEffect(() => () => siblingObserverRef.current?.disconnect(), []);

  // Recreated every render on purpose: the ref then re-runs on each
  // commit, so sibling rows mounted after the data row (e.g. conditionally
  // rendered detail rows) still get observed.
  const measureRow = (node: HTMLTableRowElement | null): void => {
    virtualizer.measureElement(node);
    if (!node) return;

    const observer = getSiblingObserver();
    if (!observer) return;

    // Drop rows that scrolled out of the window — the observer would
    // otherwise keep their detached <tr>s alive.
    for (const observed of observedSiblingsRef.current) {
      if (!observed.isConnected) {
        observer.unobserve(observed);
        observedSiblingsRef.current.delete(observed);
      }
    }

    let sibling = node.nextElementSibling;
    while (
      sibling &&
      !sibling.hasAttribute('data-index') &&
      !sibling.hasAttribute(VIRTUAL_BOUNDARY_ATTRIBUTE)
    ) {
      if (!observedSiblingsRef.current.has(sibling)) {
        observer.observe(sibling);
        observedSiblingsRef.current.add(sibling);
      }

      sibling = sibling.nextElementSibling;
    }
  };

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
        <TableRow {...virtualBoundaryProps}>
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
          ref: measureRow,
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
        <TableRow {...virtualBoundaryProps}>
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
