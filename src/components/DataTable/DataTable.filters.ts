import type { ColumnDef, Row } from '@tanstack/react-table';

import type {
  DataTableActiveFilters,
  DataTableData,
  DataTableFilterOperator,
  DataTableFilterRow,
  DataTableFilterValue,
} from './DataTable.types';

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
 * cell value accessor, so filtering and search resolve the same values the
 * cells display. Display-only columns (no accessor) are skipped.
 */
function getLeafAccessorsById<TData extends DataTableData>(
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

/** Option entries for the filter panel operator select, in display order. */
export const dataTableFilterOperators: ReadonlyArray<{
  value: DataTableFilterOperator;
  label: string;
}> = [
  { value: 'contains', label: 'contains' },
  { value: 'doesNotContain', label: 'does not contain' },
  { value: 'equals', label: 'equals' },
  { value: 'doesNotEqual', label: 'does not equal' },
  { value: 'startsWith', label: 'starts with' },
  { value: 'endsWith', label: 'ends with' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
  { value: 'isAnyOf', label: 'is any of' },
];

/**
 * The operator options offered for a column, restricted to `allowed` when a
 * column supplies `meta.filterOperators`. Display order from
 * `dataTableFilterOperators` is preserved, an empty/absent `allowed` returns
 * the full list.
 */
export function operatorOptionsFor(
  allowed?: DataTableFilterOperator[],
): typeof dataTableFilterOperators {
  return allowed?.length
    ? dataTableFilterOperators.filter((option) =>
        allowed.includes(option.value),
      )
    : dataTableFilterOperators;
}

/**
 * Default operator for a fresh filter row on a column: `contains` when allowed,
 * otherwise the first allowed operator (falls back to `contains` if the list is
 * empty).
 */
export function defaultFilterOperator(
  allowed?: DataTableFilterOperator[],
): DataTableFilterOperator {
  const options = operatorOptionsFor(allowed);

  return (
    (options.find((option) => option.value === 'contains') ?? options[0])
      ?.value ?? 'contains'
  );
}

/** Whether the operator needs a value input to be meaningful. */
export function filterOperatorRequiresValue(
  operator: DataTableFilterOperator,
): boolean {
  return operator !== 'isEmpty' && operator !== 'isNotEmpty';
}

/**
 * Whether the operator takes multiple values — rendered as a chips input
 * in the filter panel instead of a single text field.
 */
export function filterOperatorIsMultiValue(
  operator: DataTableFilterOperator,
): boolean {
  return operator === 'contains' || operator === 'isAnyOf';
}

/** Empty filter state — no rows, AND logic. */
export const EMPTY_FILTERS: DataTableActiveFilters = {
  rows: [],
  logicOperator: 'and',
};

/**
 * Whether a filter row has a usable value — rows without a value pass all
 * rows through, so they are excluded from the active-filter indicator and
 * from pre-filtering.
 */
export function isFilterRowActive(row: DataTableFilterRow): boolean {
  if (!filterOperatorRequiresValue(row.operator)) {
    return true;
  }

  if (Array.isArray(row.value)) {
    return (
      filterOperatorIsMultiValue(row.operator) &&
      row.value.some((value) => value.trim() !== '')
    );
  }

  // isAnyOf only works with an array value.
  if (row.operator === 'isAnyOf') {
    return false;
  }

  return typeof row.value === 'string' && row.value.trim() !== '';
}

/**
 * Client-side multi-filter: filters `data` rows using `filters.rows` with
 * AND or OR logic. Rows with incomplete values are skipped. Returns `data`
 * unchanged when there are no active rows (no re-allocation).
 *
 * With `columns`, each filter resolves its value through the targeted
 * column's accessor (so columns reading nested values filter correctly);
 * without them it falls back to the raw row key.
 */
export function applyFilters<TData extends DataTableData>(
  data: TData[],
  filters: DataTableActiveFilters,
  columns?: Array<ColumnDef<TData, unknown>>,
): TData[] {
  const active = filters.rows.filter(isFilterRowActive);

  if (active.length === 0) {
    return data;
  }

  const accessorsById = columns ? getLeafAccessorsById(columns) : {};

  return data.filter((item, index) => {
    const mockRow = {
      getValue: (id: string) =>
        accessorsById[id] ? accessorsById[id](item, index) : item[id],
    } as unknown as Row<TData>;

    const check = (filterRow: DataTableFilterRow): boolean =>
      dataTableFilterFn(mockRow, filterRow.columnId, {
        operator: filterRow.operator,
        value: filterRow.value,
      });

    return filters.logicOperator === 'and'
      ? active.every(check)
      : active.some(check);
  });
}

/**
 * Client-side quick search: keeps rows where any cell value contains the
 * query (case-insensitive over the stringified value, mirroring
 * `dataTableFilterFn`). Returns `data` unchanged when the query is blank
 * (no re-allocation).
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

/**
 * Operator-based filter function backing every filterable column.
 * Comparisons are case-insensitive over the stringified cell value, so it
 * works for the unknown-shape records the table is built around. Filters
 * without a usable value match every row.
 */
export function dataTableFilterFn<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: unknown,
): boolean {
  const filter = filterValue as DataTableFilterValue | undefined;

  if (!filter) {
    return true;
  }

  const raw = row.getValue(columnId);
  // Mirrors the empty values the default cell renders as an em dash.
  const isEmpty = raw === null || raw === undefined || raw === '';
  const text = isEmpty ? '' : String(raw).toLowerCase();

  switch (filter.operator) {
    case 'isEmpty':
      return isEmpty;
    case 'isNotEmpty':
      return !isEmpty;
    case 'isAnyOf': {
      const values = Array.isArray(filter.value) ? filter.value : [];

      return (
        values.length === 0 ||
        values.some((value) => text === value.trim().toLowerCase())
      );
    }
    case 'contains': {
      // Chips from the filter panel OR within the row — the value matches
      // when it contains any of them. A single string (e.g. consumer
      // supplied initial filters) works too.
      const values = Array.isArray(filter.value)
        ? filter.value
        : [filter.value ?? ''];
      const queries = values
        .map((value) => value.trim().toLowerCase())
        .filter((query) => query !== '');

      return (
        queries.length === 0 || queries.some((query) => text.includes(query))
      );
    }
    default: {
      const query =
        typeof filter.value === 'string'
          ? filter.value.trim().toLowerCase()
          : '';

      if (query === '') {
        return true;
      }

      switch (filter.operator) {
        case 'doesNotContain':
          return !text.includes(query);
        case 'equals':
          return text === query;
        case 'doesNotEqual':
          return text !== query;
        case 'startsWith':
          return text.startsWith(query);
        case 'endsWith':
          return text.endsWith(query);
        default:
          return true;
      }
    }
  }
}
