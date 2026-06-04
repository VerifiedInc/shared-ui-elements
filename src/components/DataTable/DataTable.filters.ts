import type { Row } from '@tanstack/react-table';

import type {
  DataTableActiveFilters,
  DataTableData,
  DataTableFilterOperator,
  DataTableFilterRow,
  DataTableFilterValue,
} from './DataTable.types';

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

/** Whether the operator needs a value input to be meaningful. */
export function filterOperatorRequiresValue(
  operator: DataTableFilterOperator,
): boolean {
  return operator !== 'isEmpty' && operator !== 'isNotEmpty';
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

  if (row.operator === 'isAnyOf') {
    return Array.isArray(row.value) && row.value.length > 0;
  }

  return typeof row.value === 'string' && row.value.trim() !== '';
}

/**
 * Client-side multi-filter: filters `data` rows using `filters.rows` with
 * AND or OR logic. Rows with incomplete values are skipped. Returns `data`
 * unchanged when there are no active rows (no re-allocation).
 */
export function applyFilters<TData extends DataTableData>(
  data: TData[],
  filters: DataTableActiveFilters,
): TData[] {
  const active = filters.rows.filter(isFilterRowActive);

  if (active.length === 0) {
    return data;
  }

  return data.filter((item) => {
    const mockRow = {
      getValue: (id: string) => item[id],
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
 * Client-side quick search: keeps rows where any column value contains the
 * query (case-insensitive over the stringified value, mirroring
 * `dataTableFilterFn`). Returns `data` unchanged when the query is blank
 * (no re-allocation).
 */
export function applySearch<TData extends DataTableData>(
  data: TData[],
  search: string,
): TData[] {
  const query = search.trim().toLowerCase();

  if (query === '') {
    return data;
  }

  return data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== '' &&
        String(value).toLowerCase().includes(query),
    ),
  );
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
    default: {
      const query =
        typeof filter.value === 'string'
          ? filter.value.trim().toLowerCase()
          : '';

      if (query === '') {
        return true;
      }

      switch (filter.operator) {
        case 'contains':
          return text.includes(query);
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
