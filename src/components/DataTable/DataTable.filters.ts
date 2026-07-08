import type { ColumnDef } from '@tanstack/react-table';

import type { DataTableData } from './DataTable.types';

/** Accessor resolving a column's cell value from a raw data row. */
type DataTableRowAccessor<TData> = (row: TData, index: number) => unknown;

/** Mirrors TanStack's column id resolution for a leaf def. */
function getLeafColumnId<TData>(
  def: ColumnDef<TData, unknown>,
): string | undefined {
  if (def.id) {
    return def.id;
  }

  if ('accessorKey' in def && def.accessorKey !== undefined) {
    return String(def.accessorKey).replace(/\./g, '_');
  }

  return typeof def.header === 'string' ? def.header : undefined;
}

/**
 * Flattens the defs (recursing into groups) into a map of leaf column id →
 * cell value accessor, so search resolves the same values the cells display.
 * Display-only columns (no accessor) are skipped.
 */
export function getLeafAccessorsById<TData extends DataTableData>(
  defs: Array<ColumnDef<TData, unknown>>,
): Record<string, DataTableRowAccessor<TData>> {
  const accessors: Record<string, DataTableRowAccessor<TData>> = {};

  for (const def of defs) {
    if ('columns' in def && Array.isArray(def.columns)) {
      Object.assign(
        accessors,
        getLeafAccessorsById(def.columns as Array<ColumnDef<TData, unknown>>),
      );
      continue;
    }

    const id = getLeafColumnId(def);

    if (id === undefined) {
      continue;
    }

    if ('accessorFn' in def && def.accessorFn) {
      accessors[id] = def.accessorFn;
    } else if ('accessorKey' in def && def.accessorKey !== undefined) {
      // Dots in an accessorKey walk into nested objects, like TanStack.
      const path = String(def.accessorKey).split('.');

      accessors[id] = (row) =>
        path.reduce<unknown>(
          (value, part) =>
            (value as Record<string, unknown> | undefined)?.[part],
          row,
        );
    }
  }

  return accessors;
}

/**
 * Client-side quick search: keeps rows where any cell value contains the
 * query (case-insensitive over the stringified value). Returns `data`
 * unchanged when the query is blank (no re-allocation).
 *
 * With `columns`, the search covers the cell values the columns resolve —
 * searching raw row values instead would also match fields that never
 * render (ids, nested objects). Without them it falls back to every
 * top-level row value.
 */
export function applySearch<TData extends DataTableData>(
  data: TData[],
  search: string,
  columns?: Array<ColumnDef<TData, unknown>>,
): TData[] {
  const query = search.trim().toLowerCase();

  if (query === '') {
    return data;
  }

  const matches = (value: unknown): boolean =>
    value !== null &&
    value !== undefined &&
    value !== '' &&
    String(value).toLowerCase().includes(query);

  const accessors = columns ? Object.values(getLeafAccessorsById(columns)) : [];

  if (accessors.length > 0) {
    return data.filter((item, index) =>
      accessors.some((accessor) => matches(accessor(item, index))),
    );
  }

  return data.filter((item) => Object.values(item).some(matches));
}
