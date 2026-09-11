import { IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import type { ColumnDef, Row } from '@tanstack/react-table';

// The two halves of the expandable-row pattern for `DataTable` custom rows: a
// leading utility column that carries no data, and the chevron that toggles the
// row from it. Pair them — `expandColumn()` in the column list, `ExpandRowToggle`
// in the cell whose id is `EXPAND_COLUMN_ID` — and render the detail row inside
// a `Collapse` styled with `EXPANDED_ROW_PANEL_SX`.

export const EXPAND_COLUMN_ID = 'expand';

/**
 * Drives both halves of the animation — the chevron's rotation and the detail
 * panel's `Collapse` timeout.
 */
export const EXPAND_TRANSITION_MS = 200;

/**
 * Sticky-left, at content width, so an expanded panel follows the viewport
 * while the table scrolls horizontally instead of rolling off to the left and
 * leaving the expanded row blank. Spread it alongside the panel's own padding.
 */
export const EXPANDED_ROW_PANEL_SX = {
  position: 'sticky',
  left: 0,
  width: 'fit-content',
} as const;

/**
 * Display-only, so it is skipped by the CSV / Excel / Print export, and opted
 * out of every column feature — there is nothing to sort, filter, hide or
 * resize.
 */
export function expandColumn<TData>(): ColumnDef<TData, unknown> {
  return {
    id: EXPAND_COLUMN_ID,
    header: '',
    meta: { width: 72, disableColumnMenu: true },
    enableHiding: false,
    enableResizing: false,
    enablePinning: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableGrouping: false,
    enableMultiSort: false,
    enableSorting: false,
  };
}

export interface ExpandRowToggleProps<TData> {
  row: Row<TData>;
  disabled?: boolean;
}

export function ExpandRowToggle<TData>({
  row,
  disabled,
}: Readonly<ExpandRowToggleProps<TData>>) {
  const open = row.getIsExpanded();

  return (
    <IconButton
      size='small'
      aria-label={open ? 'Collapse row' : 'Expand row'}
      aria-expanded={open}
      disabled={disabled}
      onClick={row.getToggleExpandedHandler()}
    >
      <ChevronRight
        sx={{
          transform: open ? 'rotate(90deg)' : 'none',
          transition: `transform ${EXPAND_TRANSITION_MS}ms`,
        }}
      />
    </IconButton>
  );
}
