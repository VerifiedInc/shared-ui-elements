import type { ReactNode, Ref } from 'react';

import type {
  ColumnDef,
  PaginationState,
  Row,
  SortingState,
} from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';

/**
 * Generic record shape — the table works with arrays of objects whose
 * shape is unknown ahead of time.
 */
export type DataTableData = Record<string, unknown>;

/**
 * Optional per-column display hints, supplied via the TanStack
 * `ColumnDef.meta` field.
 */
export interface DataTableColumnMeta {
  align?: 'left' | 'right' | 'center';
  /**
   * Column width — any CSS width value: a number for px (e.g. 140) or a
   * string for percentage fill (e.g. '40%'). Applied to the header cell,
   * which sizes the whole column.
   */
  width?: number | string;
}

/**
 * Context handed to the custom row renderer. The default row markup is
 * available through `renderDefaultRow` so custom renderers can decorate it
 * (e.g. append an expandable detail row) instead of rebuilding it.
 */
export interface DataTableRowContext<TData> {
  /** TanStack row — `row.original` holds the raw data object. */
  row: Row<TData>;
  /** Virtual item for this row (index, measured size, offsets). */
  virtualRow: VirtualItem;
  /**
   * Spread onto the root `<TableRow>` of a custom row so the virtualizer
   * can measure its rendered height.
   */
  rowProps: {
    'data-index': number;
    ref: Ref<HTMLTableRowElement>;
  };
  /** Renders the default `<TableRow>` for this row. */
  renderDefaultRow: () => ReactNode;
}

export interface DataTableProps<TData extends DataTableData> {
  data: TData[];
  /**
   * TanStack column definitions. When omitted, columns are inferred from
   * the keys of the first data row with sensible header/cell defaults
   * (inferred columns are all sortable).
   *
   * Sorting is opt-in: declare sortable columns with
   * `enableSorting: true` on their defs — columns are plain labels
   * otherwise.
   *
   * Supports TanStack group defs (`{ header: 'Group', columns: [...] }`)
   * for a grouped header: group labels render centered above their
   * sub-columns while ungrouped columns span all header rows.
   */
  columns?: Array<ColumnDef<TData, unknown>>;
  /** Stable row identity; falls back to the row index. */
  getRowId?: (row: TData, index: number) => string;
  /** Custom row renderer; falls back to the default row markup. */
  renderRow?: (context: DataTableRowContext<TData>) => ReactNode;
  /** Initial sorting state, e.g. `[{ id: 'email', desc: false }]`. */
  initialSorting?: SortingState;
  /**
   * Controlled sorting state (pair with `onSortingChange`). Takes
   * precedence over `initialSorting`. When omitted, sorting state is
   * internal.
   */
  sorting?: SortingState;
  /**
   * Called with the next sorting state when a header is clicked. With
   * `manualSorting`, fetch the re-sorted rows from the server in response
   * (and usually reset the page to 0).
   */
  onSortingChange?: (sorting: SortingState) => void;
  /**
   * Server-side sorting: rows in `data` are assumed to already be sorted —
   * header clicks only update the sorting state, nothing is sorted
   * client-side.
   */
  manualSorting?: boolean;
  /** Rows per page when the table mounts. Defaults to 25. */
  initialPageSize?: number;
  /** Options for the rows-per-page select. Defaults to [10, 25, 50, 100]. */
  pageSizeOptions?: number[];
  /**
   * Controlled pagination state (pair with `onPaginationChange`). Use when
   * the consumer needs to drive the page externally — e.g. reset to the
   * first page when filters change. Takes precedence over
   * `initialPageSize`. When omitted, pagination state is internal.
   */
  pagination?: PaginationState;
  /**
   * Called with the next pagination state whenever the page or page size
   * changes. With `manualPagination`, fetch the new page from the server
   * in response (e.g. by keying a React Query on this state).
   */
  onPaginationChange?: (pagination: PaginationState) => void;
  /**
   * Server-side pagination: rows in `data` are treated as the current
   * page (no client-side slicing) and `rowCount` drives the pager.
   */
  manualPagination?: boolean;
  /**
   * Total row count on the server. Required with `manualPagination` so
   * the pager knows how many pages exist.
   */
  rowCount?: number;
  /**
   * Disables sorting for the whole table — headers render as plain labels
   * and rows keep the order of `data`, even for columns declaring
   * `enableSorting: true`.
   */
  disableSorting?: boolean;
  /** Hides the pagination footer and renders all rows (still virtualized). */
  disablePagination?: boolean;
  /**
   * Content rendered on the left side of the footer, opposite the
   * pagination controls (e.g. a summary, bulk actions or an export button).
   * Rendered even when pagination is disabled.
   */
  footerLeft?: ReactNode;
  /** Estimated row height in px used by the virtualizer. Defaults to 53. */
  estimateRowHeight?: number;
  /** Max height of the scroll container. Defaults to 600. */
  maxHeight?: number | string;
  /**
   * Table layout algorithm. With the default 'auto', column widths are
   * hints and content can stretch a column. Use 'fixed' to enforce the
   * exact px/percentage widths set via column meta.
   */
  tableLayout?: 'auto' | 'fixed';
  /** Message displayed when `data` is empty. */
  emptyMessage?: string;
  isLoading?: boolean;
  /**
   * Custom loading state renderer, shown while `isLoading` is true and
   * there are no rows. Rendered inside the table body, so it must return
   * one or more `<TableRow>`s (e.g. skeleton rows). Receives the column
   * count for `colSpan`. Falls back to a default loading row.
   */
  renderLoading?: (columnCount: number) => ReactNode;
}
