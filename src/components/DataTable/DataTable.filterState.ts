import type {
  DataTableData,
  DataTableFilterField,
  DataTableFilterFieldValue,
  DataTableFilterOperator,
  DataTableFilterState,
} from './DataTable.types';

/**
 * The empty value for a field, by kind - text starts on its first operator
 * (default `contains`) with a blank query, the rest start cleared.
 */
export function emptyFieldValue(
  field: DataTableFilterField,
): DataTableFilterFieldValue {
  switch (field.kind) {
    case 'text':
      return {
        kind: 'text',
        operator: field.operators?.[0] ?? 'contains',
        value: '',
      };
    case 'select':
      return { kind: 'select', value: null };
    case 'multiSelect':
      return { kind: 'multiSelect', values: [] };
    case 'boolean':
      return { kind: 'boolean', value: null };
    case 'group':
      return { kind: 'group', values: {} };
  }
}

/** Blank filter state for a set of fields - every field cleared. */
export function buildInitialFilterState(
  fields: DataTableFilterField[],
): DataTableFilterState {
  const state: DataTableFilterState = {};

  for (const field of fields) {
    state[field.id] = emptyFieldValue(field);
  }

  return state;
}

/** Whether every option of a `multiSelect`/section is selected (select-all). */
function isFullySelected(
  selected: string[],
  optionCount: number,
  selectAllClears: boolean,
): boolean {
  return selectAllClears && optionCount > 0 && selected.length >= optionCount;
}

/**
 * Whether a field currently applies a filter - drives both the active-filter
 * badge count and client-side filtering. A blank text field, an empty
 * multi-select, an unset boolean, and (when `selectAllClears`) a
 * fully-selected multi-select all count as inactive.
 */
export function isFilterFieldActive(
  field: DataTableFilterField,
  value: DataTableFilterFieldValue | undefined,
): boolean {
  if (!value || value.kind !== field.kind) {
    return false;
  }

  const selectAllClears = field.selectAllClears ?? true;

  switch (value.kind) {
    case 'text':
      if (value.operator === 'isEmpty' || value.operator === 'isNotEmpty') {
        return true;
      }
      return value.value.trim() !== '';
    case 'select':
      return value.value != null && value.value !== '';
    case 'multiSelect':
      return (
        value.values.length > 0 &&
        !isFullySelected(
          value.values,
          field.options?.length ?? 0,
          selectAllClears,
        )
      );
    case 'boolean':
      return value.value != null;
    case 'group':
      return (field.sections ?? []).some((section) => {
        const selected = value.values[section.key] ?? [];

        return (
          selected.length > 0 &&
          !isFullySelected(selected, section.options.length, selectAllClears)
        );
      });
  }
}

/**
 * Number of fields currently applying a filter - the Filters button badge.
 */
export function effectiveFilterFieldCount(
  fields: DataTableFilterField[],
  state: DataTableFilterState,
): number {
  return fields.filter((field) => isFilterFieldActive(field, state[field.id]))
    .length;
}

/** Case-insensitive text-operator match, mirroring `dataTableFilterFn`. */
function matchText(
  raw: unknown,
  operator: DataTableFilterOperator,
  query: string,
): boolean {
  const isEmpty = raw === null || raw === undefined || raw === '';
  const text = isEmpty ? '' : String(raw).toLowerCase();

  if (operator === 'isEmpty') return isEmpty;
  if (operator === 'isNotEmpty') return !isEmpty;

  const needle = query.trim().toLowerCase();

  if (needle === '') return true;

  switch (operator) {
    case 'doesNotContain':
      return !text.includes(needle);
    case 'equals':
      return text === needle;
    case 'doesNotEqual':
      return text !== needle;
    case 'startsWith':
      return text.startsWith(needle);
    case 'endsWith':
      return text.endsWith(needle);
    case 'contains':
    default:
      return text.includes(needle);
  }
}

/** Coerces a cell value to a boolean for a `boolean` field comparison. */
function normalizeBoolean(raw: unknown): boolean | null {
  if (typeof raw === 'boolean') return raw;
  if (raw === 'true' || raw === 'Yes') return true;
  if (raw === 'false' || raw === 'No') return false;
  return null;
}

/**
 * Whether one row passes one active field. Values within a `multiSelect` OR
 * together (the cell matches any selected value).
 */
function rowPassesField(
  cellValue: unknown,
  value: DataTableFilterFieldValue,
): boolean {
  switch (value.kind) {
    case 'text':
      return matchText(cellValue, value.operator, value.value);
    case 'select':
      return value.value == null || String(cellValue) === value.value;
    case 'multiSelect':
      return (
        value.values.length === 0 || value.values.includes(String(cellValue))
      );
    case 'boolean':
      return value.value == null || normalizeBoolean(cellValue) === value.value;
    case 'group':
      // Group fields span several server params with no single column, so
      // they aren't applied client-side (they're server-only "extended"
      // filters). Passing here leaves them to `onFilterStateChange`.
      return true;
  }
}

/**
 * Client-side filtering for `manualFiltering` off: keeps rows passing every
 * active, column-bound field (fields AND together). Fields without a
 * `columnId` (and `group` fields) are server-only and skipped here. Returns
 * `data` unchanged when nothing is active (no re-allocation).
 *
 * `getCellValue` resolves a column's value for a row - the DataTable passes a
 * column-accessor-backed reader, the default reads the raw row key, which is
 * enough for plain-object data.
 */
export function applyFieldFilters<TData extends DataTableData>(
  data: TData[],
  fields: DataTableFilterField[],
  state: DataTableFilterState,
  getCellValue: (row: TData, columnId: string, index: number) => unknown = (
    row,
    columnId,
  ) => row[columnId],
): TData[] {
  const active = fields.filter(
    (field) =>
      field.columnId !== undefined &&
      field.kind !== 'group' &&
      isFilterFieldActive(field, state[field.id]),
  );

  if (active.length === 0) {
    return data;
  }

  return data.filter((row, index) =>
    active.every((field) => {
      const value = state[field.id];

      return (
        value !== undefined &&
        rowPassesField(
          getCellValue(row, field.columnId as string, index),
          value,
        )
      );
    }),
  );
}
