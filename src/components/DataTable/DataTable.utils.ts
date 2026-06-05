import type { Column, ColumnDef } from '@tanstack/react-table';

import type { DataTableColumnMeta, DataTableData } from './DataTable.types';

/**
 * Marks tbody rows that don't belong to any virtual row group (the
 * virtualizer padding rows, the bidirectional-scroll edge indicators) so
 * group measurement and observation stop walking when they reach one.
 */
export const VIRTUAL_BOUNDARY_ATTRIBUTE = 'data-virtual-boundary';

/**
 * Measures a logical row group. A single virtual row renders as several
 * sibling `<tr>`s — the data row (which carries `data-index` and the
 * measure ref) plus the divider row and any detail row a custom renderRow
 * appends — so measuring only the first `<tr>` (the virtualizer default)
 * undersizes every row, making the scrollbar jitter while scrolling, and
 * ignores expanded detail panels entirely, snapping the scroll when their
 * row leaves the render window. Sums the whole group up to the next
 * measured row or a boundary row instead.
 */
export function measureRowGroup(element: Element): number {
  let height = (element as HTMLElement).offsetHeight;

  let sibling = element.nextElementSibling;
  while (
    sibling &&
    !sibling.hasAttribute('data-index') &&
    !sibling.hasAttribute(VIRTUAL_BOUNDARY_ATTRIBUTE)
  ) {
    height += (sibling as HTMLElement).offsetHeight;
    sibling = sibling.nextElementSibling;
  }

  return height;
}

/** Turns an object key into a readable header label, e.g. `createdAt` → `Created At`. */
export function formatColumnLabel(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Default cell formatting for values of unknown shape. */
export function formatCellValue(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

/** Builds default column definitions from the keys of the first data row. */
export function inferColumns<TData extends DataTableData>(
  data: TData[],
): Array<ColumnDef<TData, unknown>> {
  const [firstRow] = data;

  if (!firstRow) {
    return [];
  }

  return Object.keys(firstRow).map((key) => ({
    id: key,
    accessorFn: (row: TData) => row[key],
    header: formatColumnLabel(key),
    cell: (info) => formatCellValue(info.getValue()),
    // Zero-config tables keep every inferred column sortable.
    enableSorting: true,
  }));
}

export function getColumnMeta(meta: unknown): DataTableColumnMeta | undefined {
  return meta as DataTableColumnMeta | undefined;
}

/**
 * Plain-text label for a column, used where the header def can't be
 * rendered (aria-labels, the filter panel column select, the manage
 * columns list). Function/element headers fall back to a label derived
 * from the column id.
 */
export function getColumnLabel<TData>(column: Column<TData, unknown>): string {
  const { header } = column.columnDef;

  return typeof header === 'string' && header.length > 0
    ? header
    : formatColumnLabel(column.id);
}

/**
 * Copies numeric meta widths onto the TanStack `size` (recursing into group
 * defs) so drag-resizing starts from the rendered width instead of jumping
 * to TanStack's 150px default on the first drag.
 */
export function applyMetaWidthsToSizes<TData extends DataTableData>(
  defs: Array<ColumnDef<TData, unknown>>,
): Array<ColumnDef<TData, unknown>> {
  return defs.map((def) => {
    const meta = getColumnMeta(def.meta);
    const next = { ...def };

    if (typeof meta?.width === 'number' && next.size === undefined) {
      next.size = meta.width;
    }

    if ('columns' in next && Array.isArray(next.columns)) {
      next.columns = applyMetaWidthsToSizes(
        next.columns as Array<ColumnDef<TData, unknown>>,
      );
    }

    return next;
  });
}
