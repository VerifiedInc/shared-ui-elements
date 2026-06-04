import type { ComponentType, ReactNode, Ref } from 'react';

import type { SvgIconProps } from '@mui/material';
import type {
  ColumnDef,
  ColumnPinningState,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';

/**
 * Generic record shape — the table works with arrays of objects whose
 * shape is unknown ahead of time.
 */
export type DataTableData = Record<string, unknown>;

/** Operators available in the column filter panel (MUI DataGrid parity). */
export type DataTableFilterOperator =
  | 'contains'
  | 'doesNotContain'
  | 'equals'
  | 'doesNotEqual'
  | 'startsWith'
  | 'endsWith'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'isAnyOf';

/**
 * Low-level value shape used internally by `dataTableFilterFn` — consumed
 * from `DataTableFilterRow` when pre-filtering client-side.
 */
export interface DataTableFilterValue {
  operator: DataTableFilterOperator;
  /** A single string for most operators; a `string[]` for `isAnyOf`. */
  value?: string | string[];
}

/** Whether all filter rows must match (AND) or any one suffices (OR). */
export type DataTableFilterLogicOperator = 'and' | 'or';

/**
 * One row in the filter panel. Each row targets a specific column with an
 * operator and optional value. `id` is a unique key within the current
 * filter state (not the column id) so multiple rows can target the same
 * column.
 */
export interface DataTableFilterRow {
  id: string;
  columnId: string;
  operator: DataTableFilterOperator;
  /** `string` for most operators; `string[]` for `isAnyOf`. */
  value?: string | string[];
}

/**
 * The full filter state passed to / returned from the table. With
 * `manualFiltering`, translate these into the server query in
 * `onFiltersChange`; client-side filtering is applied automatically
 * otherwise.
 */
export interface DataTableActiveFilters {
  rows: DataTableFilterRow[];
  logicOperator: DataTableFilterLogicOperator;
}

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
 * Replacement component for one of the table's built-in MUI icons. Slots
 * receive the same props as the icon they replace (`fontSize`, `sx`, ...) so
 * MUI icons drop in directly; custom components are free to ignore them.
 */
export type DataTableIconComponent = ComponentType<SvgIconProps>;

/**
 * Custom icon mapping — each slot replaces the MUI icon the table renders
 * there by default. Unset slots keep the MUI default.
 */
export interface DataTableIcons {
  /**
   * Sort direction arrow on sortable headers. Defaults to the MUI
   * TableSortLabel arrow.
   */
  sort?: DataTableIconComponent;
  /** Column menu "Sort by ASC" item. Defaults to ArrowUpward. */
  sortAsc?: DataTableIconComponent;
  /** Column menu "Sort by DESC" item. Defaults to ArrowDownward. */
  sortDesc?: DataTableIconComponent;
  /** Column menu "Pin to left" item. Defaults to a left-tilted PushPin. */
  pinLeft?: DataTableIconComponent;
  /** Column menu "Pin to right" item. Defaults to a right-tilted PushPin. */
  pinRight?: DataTableIconComponent;
  /** Column menu "Unpin" item. Defaults to PushPinOutlined. */
  unpin?: DataTableIconComponent;
  /**
   * Kebab button on header hover that opens the column menu. Defaults to
   * MoreVert.
   */
  columnMenu?: DataTableIconComponent;
  /**
   * Column menu "Filter" item and the active-filter indicator on filtered
   * headers. Defaults to FilterAlt.
   */
  filter?: DataTableIconComponent;
  /** Toolbar "Filters" button. Defaults to FilterList. */
  openFilterPanel?: DataTableIconComponent;
  /**
   * Toolbar "Manage columns" button and the column menu "Manage columns"
   * item. Defaults to ViewColumn.
   */
  manageColumns?: DataTableIconComponent;
  /** Column menu "Hide column" item. Defaults to VisibilityOff. */
  hideColumn?: DataTableIconComponent;
  /**
   * Search adornments — the toolbar quick search and the manage columns
   * panel input. Defaults to Search.
   */
  search?: DataTableIconComponent;
  /**
   * Clear buttons — clear search and remove a filter panel row. Defaults
   * to Close.
   */
  close?: DataTableIconComponent;
  /** Filter panel "Add filter" button. Defaults to Add. */
  addFilter?: DataTableIconComponent;
  /** Filter panel "Remove all" button. Defaults to DeleteOutline. */
  removeAllFilters?: DataTableIconComponent;
  /** Pagination first-page button. Defaults to FirstPage. */
  paginationFirst?: DataTableIconComponent;
  /** Pagination previous-page button. Defaults to KeyboardArrowLeft. */
  paginationPrevious?: DataTableIconComponent;
  /** Pagination next-page button. Defaults to KeyboardArrowRight. */
  paginationNext?: DataTableIconComponent;
  /** Pagination last-page button. Defaults to LastPage. */
  paginationLast?: DataTableIconComponent;
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
  /**
   * Custom row renderer; falls back to the default row markup. Custom rows
   * build their own cells, so column visibility (Hide column / Manage
   * columns) only affects them when they render from
   * `row.getVisibleCells()` instead of hardcoding cells. Pinned-column
   * stickiness is likewise applied by the default cells only — custom rows
   * must style their own.
   */
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
   * Adds drag handles (vertical separator lines) on the header cell edges
   * to resize columns; double-clicking a handle restores the column's
   * default width. Drags start from the column's rendered width (measured
   * when the drag starts; numeric `meta.width` values seed it upfront).
   * Per-column opt-out via `enableResizing: false` on the def. Widths are
   * enforced exactly with `tableLayout: 'fixed'`; with the default 'auto',
   * content can keep a column from shrinking below its natural width.
   */
  enableColumnResizing?: boolean;
  /**
   * Shows a kebab menu on each column header (revealed on hover, like the
   * MUI DataGrid) with per-column actions: Sort by ASC/DESC for sortable
   * columns, Pin to left / Pin to right / Unpin with
   * `enableColumnPinning`, Filter for filterable columns, and Hide column
   * / Manage columns for column visibility.
   *
   * Every accessor column is filterable through the operator-based filter
   * panel by default — opt a column out with `enableColumnFilter: false`
   * on its def.
   */
  enableColumnMenu?: boolean;
  /**
   * Adds Pin to left / Pin to right / Unpin actions to the column menu.
   * Pinned columns reorder to that edge and stay sticky while the table
   * scrolls horizontally; their offsets are measured from the rendered
   * header cells, so they hold under both table layouts. Per-column
   * opt-out via `enablePinning: false` on the def. Custom `renderRow`
   * rows build their own cells and must apply their own sticky styles.
   */
  enableColumnPinning?: boolean;
  /**
   * Shows a toolbar row above the table with Manage columns and Filters
   * buttons plus a search button that expands into a quick-search input on
   * the right, like the MUI DataGrid toolbar. The filter button carries a
   * badge with the active filter count. While the toolbar is shown, the
   * filter / manage columns panels open anchored to their toolbar button —
   * including when triggered from a column menu — instead of at the column
   * that opened them.
   */
  showToolbar?: boolean;
  /**
   * Initial filter state. Rows are applied as AND by default; switch to OR
   * via `logicOperator: 'or'`.
   *
   * @example
   * initialFilters={{ rows: [{ id: 'f1', columnId: 'role', operator: 'equals', value: 'admin' }], logicOperator: 'and' }}
   */
  initialFilters?: DataTableActiveFilters;
  /**
   * Controlled filter state (pair with `onFiltersChange`). Takes
   * precedence over `initialFilters`. When omitted, filter state is
   * internal.
   */
  filters?: DataTableActiveFilters;
  /**
   * Called with the next filter state when the filter panel changes. With
   * `manualFiltering`, fetch the matching rows from the server in response
   * (and usually reset the page to 0).
   */
  onFiltersChange?: (filters: DataTableActiveFilters) => void;
  /**
   * Server-side filtering: rows in `data` are assumed to already match the
   * active filters and search query — the filter panel and the toolbar
   * search input only update their state, nothing is filtered client-side.
   */
  manualFiltering?: boolean;
  /** Initial quick-search query for the toolbar search input. */
  initialSearch?: string;
  /**
   * Controlled quick-search query (pair with `onSearchChange`). Takes
   * precedence over `initialSearch`. When omitted, search state is
   * internal.
   */
  search?: string;
  /**
   * Called with the next query as the user types in the toolbar search
   * input. With `manualFiltering`, fetch the matching rows from the server
   * in response (and usually reset the page to 0).
   */
  onSearchChange?: (search: string) => void;
  /**
   * Initial column visibility, keyed by column id — `{ role: false }`
   * mounts the table with the role column hidden. Also what the manage
   * columns panel's Reset restores. Per-column opt-out from hiding via
   * `enableHiding: false` on the def.
   */
  initialColumnVisibility?: VisibilityState;
  /**
   * Controlled column visibility state (pair with
   * `onColumnVisibilityChange`) — e.g. to persist hidden columns per user.
   * Takes precedence over `initialColumnVisibility`. When omitted,
   * visibility state is internal.
   */
  columnVisibility?: VisibilityState;
  /**
   * Called with the next visibility state whenever a column is hidden or
   * shown (column menu, manage columns panel).
   */
  onColumnVisibilityChange?: (columnVisibility: VisibilityState) => void;
  /**
   * Initial pinned columns, e.g. `{ left: ['email'], right: [] }` —
   * requires `enableColumnPinning`.
   */
  initialColumnPinning?: ColumnPinningState;
  /**
   * Controlled pinning state (pair with `onColumnPinningChange`) — e.g.
   * to persist pinned columns per user. Takes precedence over
   * `initialColumnPinning`. When omitted, pinning state is internal.
   */
  columnPinning?: ColumnPinningState;
  /**
   * Called with the next pinning state whenever a column is pinned or
   * unpinned from the column menu.
   */
  onColumnPinningChange?: (columnPinning: ColumnPinningState) => void;
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
  /**
   * Custom icon mapping — replaces the MUI icons the table renders by
   * default (toolbar buttons, column menu items, filter panel actions,
   * pagination arrows). Unset slots keep the MUI default.
   *
   * @example
   * icons={{ search: MagnifyingGlass, columnMenu: DotsThree }}
   */
  icons?: DataTableIcons;
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
