import type { ComponentType, CSSProperties, ReactNode, Ref } from 'react';

import type { SvgIconProps, SxProps, Theme } from '@mui/material';
import type {
  Cell,
  ColumnDef,
  ColumnPinningState,
  PaginationState,
  Row,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';

import type { DataTableExportColumn } from './DataTable.export';

/**
 * Generic record shape — the table works with arrays of objects whose
 * shape is unknown ahead of time.
 */
export type DataTableData = Record<string, unknown>;

/** Text-match operators for a `text` filter field. */
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

// ---------------------------------------------------------------------------
// Declarative filter-field spec
//
// The table renders its own filter panel from a `filterFields` spec: each
// field declares a control kind (text / select / multiSelect / boolean /
// group) plus its options, and the panel renders the matching control. State
// is emitted in server-value terms (option `value`s, not display labels), so
// a consumer maps it 1:1 to its query params.
// ---------------------------------------------------------------------------

/** Control kind a `DataTableFilterField` renders in the filter panel. */
export type DataTableFilterFieldKind =
  | 'text' // free input -> operator match (contains / startsWith / ...)
  | 'select' // single choice from `options`
  | 'multiSelect' // multi choice from `options`, value may differ from label
  | 'boolean' // Yes / No tri-state (unset = no filter)
  | 'group'; // sectioned multiSelect (each section a distinct field)

/**
 * One selectable choice. `value` is the server value carried end-to-end (a
 * uuid, enum code, `'true'`/`'false'`, ...), `label` is what the user sees.
 * Keeping them separate is what lets the panel disambiguate duplicate display
 * names (options are keyed by `value`).
 */
export interface DataTableFilterOption {
  label: string;
  value: string;
}

/** One section of a `group` field, a labelled sub-list of options. */
export interface DataTableFilterSection {
  /** Stable key for this section within its field's state. */
  key: string;
  label: string;
  options: DataTableFilterOption[];
}

/**
 * Declarative description of one filter control. `columnId` binds the field
 * to a table column (used for client-side filtering when `manualFiltering`
 * is off); omit it for a non-column ("extended") filter whose meaning lives
 * only server-side.
 */
export interface DataTableFilterField {
  /** Stable key this field's value is stored under in `DataTableFilterState`. */
  id: string;
  /** Label shown above the control in the panel. */
  label: string;
  kind: DataTableFilterFieldKind;
  /**
   * Column this field filters, when it maps to one. Absent = a non-column
   * filter (e.g. an activity filter spanning several server params); such
   * fields are skipped by client-side filtering and only surface through
   * `onFilterStateChange`.
   */
  columnId?: string;
  /** Choices for `select` / `multiSelect`. */
  options?: DataTableFilterOption[];
  /** Sections for `group`. */
  sections?: DataTableFilterSection[];
  /**
   * Text operators offered (and their order) for a `text` field. Defaults to
   * `['contains']`. The first entry is the default operator.
   */
  operators?: DataTableFilterOperator[];
  /**
   * For `multiSelect` / `group`: treat "every option selected" the same as
   * "none selected" - i.e. a fully-selected control applies no filter and
   * does not count toward the active-filter badge. Defaults to `true`.
   */
  selectAllClears?: boolean;
  /** Placeholder for the input (text / select / multiSelect). */
  placeholder?: string;
}

/**
 * The value of a single field, discriminated by `kind`. Stored under the
 * field's `id` in `DataTableFilterState`.
 */
export type DataTableFilterFieldValue =
  | { kind: 'text'; operator: DataTableFilterOperator; value: string }
  | { kind: 'select'; value: string | null }
  | { kind: 'multiSelect'; values: string[] }
  | { kind: 'boolean'; value: boolean | null }
  | { kind: 'group'; values: Record<string, string[]> };

/** Full filter state: each field's value keyed by its `id`. */
export type DataTableFilterState = Record<string, DataTableFilterFieldValue>;

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
   *
   * With `enableColumnResizing`, a numeric (px) width behaves like a
   * drag-resize: the table grows to the sum of the column widths and
   * scrolls horizontally rather than shrinking the other columns to fit,
   * so a large width never reflows its neighbors. Percentage widths still
   * split the available space.
   */
  width?: number | string;
  /**
   * Hides the hover kebab (column menu) on this column even when the table
   * has `enableColumnMenu`. Use for utility columns with nothing to act on
   * (e.g. an expand/select column) so they don't show a menu offering only
   * the global "Manage columns" action.
   */
  disableColumnMenu?: boolean;
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
  /** Toolbar "Export" button. Defaults to FileDownloadOutlined. */
  export?: DataTableIconComponent;
  /** Export menu "Print" item. Defaults to Print. */
  print?: DataTableIconComponent;
  /** Export menu "Download as CSV" item. Defaults to DescriptionOutlined. */
  downloadCsv?: DataTableIconComponent;
  /** Export menu "Download as Excel" item. Defaults to GridOnOutlined. */
  downloadExcel?: DataTableIconComponent;
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
 * Props for one body `<TableCell>` matching the default cells: the meta
 * alignment plus, for pinned columns, the sticky offset and background
 * styles (and the fixed-layout overflow clipping).
 */
export interface DataTableCellProps {
  align?: DataTableColumnMeta['align'];
  style?: CSSProperties;
  sx?: SxProps<Theme>;
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
   * Spread onto the first `<TableRow>` of a custom row so the virtualizer
   * can measure its rendered height. Sibling rows rendered after it (e.g.
   * a divider row or an expandable detail row) are measured and observed
   * as part of the same row group — expanding a Collapse panel resizes
   * the virtual row instead of snapping the scroll.
   */
  rowProps: {
    'data-index': number;
    ref: Ref<HTMLTableRowElement>;
  };
  /**
   * Spread onto each `<TableCell>` of a custom row (built from
   * `row.getVisibleCells()`) to match the default cells — column meta
   * alignment plus, with `enableColumnPinning`, the sticky styles that
   * keep pinned cells in place while the table scrolls horizontally.
   */
  getCellProps: (cell: Cell<TData, unknown>) => DataTableCellProps;
  /** Renders the default `<TableRow>` for this row. */
  renderDefaultRow: () => ReactNode;
}

/**
 * Configuration for bidirectional infinite scroll (see
 * `DataTableProps.bidirectionalScroll`). The flags describe a paged,
 * reverse-chronological feed: "newer" pages sit above the loaded window,
 * "older" pages below it.
 */
export interface DataTableBidirectionalScroll {
  /** Whether more rows exist above the loaded window. */
  hasNewer?: boolean;
  /** Whether more rows exist below the loaded window. */
  hasOlder?: boolean;
  /**
   * Whether a newer-page fetch is in flight — shows the sticky indicator
   * below the header and holds the scroll position when the rows land.
   */
  isLoadingNewer?: boolean;
  /**
   * Whether an older-page fetch is in flight — shows the sticky indicator
   * at the bottom edge.
   */
  isLoadingOlder?: boolean;
  /**
   * Called when the user scrolls to the top edge — fetch the next newer
   * page and prepend its rows to `data`.
   */
  onLoadNewer: () => void;
  /**
   * Called when the user scrolls to the bottom edge — fetch the next older
   * page and append its rows to `data`.
   */
  onLoadOlder: () => void;
  /**
   * When this value changes, the scroll position resets to the top and the
   * edge triggers re-arm. Derive it from the active filters (e.g. a
   * serialised filter string) so a filter change starts a fresh feed.
   */
  resetKey?: string | number;
  /** Label inside the top indicator. Defaults to 'Loading newer rows'. */
  loadingNewerLabel?: string;
  /** Label inside the bottom indicator. Defaults to 'Loading older rows'. */
  loadingOlderLabel?: string;
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
   * `row.getVisibleCells()` instead of hardcoding cells. Spread
   * `getCellProps(cell)` onto each cell to keep the default alignment and
   * pinned-column stickiness.
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
   * Bidirectional infinite scroll for streaming feeds (e.g. logs):
   * scrolling to the bottom edge calls `onLoadOlder`, scrolling back to
   * the top edge calls `onLoadNewer`, and sticky in-flight indicators pin
   * to the edges while a page loads. The scroll position is preserved when
   * newer rows are prepended, so the viewport doesn't jump.
   *
   * The consumer owns the pages: merge the fetched rows into `data` and
   * flip the `has*` / `isLoading*` flags (e.g. from a React Query infinite
   * query). Pair with `disablePagination` (the scroll edges replace the
   * pager) and `getRowId` (prepended rows shift the indexes, which are the
   * default row identity); rows are assumed to arrive in feed order, so
   * sorting is usually disabled or manual.
   */
  bidirectionalScroll?: DataTableBidirectionalScroll;
  /**
   * Adds drag handles (vertical separator lines) on the header cell edges
   * to resize columns; double-clicking a handle restores the column's
   * pre-drag width. Drags start from the column's rendered width, and the
   * other columns are frozen at theirs — resizing changes the table width
   * (adding horizontal scroll as needed) instead of reflowing the
   * neighboring columns. Per-column opt-out via `enableResizing: false`
   * on the def. Widths are enforced exactly with `tableLayout: 'fixed'`;
   * with the default 'auto', content can keep a column from shrinking
   * below its natural width.
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
   * on its def. Hide the kebab on a specific column (e.g. a utility
   * expand/select column) with `meta.disableColumnMenu`.
   */
  enableColumnMenu?: boolean;
  /**
   * Adds Pin to left / Pin to right / Unpin actions to the column menu.
   * Pinned columns reorder to that edge and stay sticky while the table
   * scrolls horizontally; their offsets are measured from the rendered
   * header cells, so they hold under both table layouts. Per-column
   * opt-out via `enablePinning: false` on the def. Custom `renderRow`
   * rows build their own cells — spread `getCellProps(cell)` onto them
   * to get the sticky styles.
   *
   * The table only scrolls horizontally once it is wider than its
   * container — pair with a `minWidth` beyond the container width (or
   * exact column widths on every column with `tableLayout: 'fixed'`),
   * otherwise there is nothing for pinned columns to stick over.
   */
  enableColumnPinning?: boolean;
  /**
   * Pins the left-most (first leaf) column to the left by default, so it stays visible while the
   * table scrolls horizontally. Defaults to `true`. The pin applies even without
   * `enableColumnPinning` (which only adds the column-menu pin actions). Set `false` to opt out, or
   * pass `initialColumnPinning` / a controlled `columnPinning` to take over pinning entirely.
   */
  pinFirstColumn?: boolean;
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
   * Adds an Export button to the toolbar (requires `showToolbar`) with
   * Print, Download as CSV and Download as Excel actions. Exports always
   * reflect the displayed table: the filtered + sorted rows across every
   * page and the visible accessor columns in display order (display-only
   * columns are skipped). With grouped columns the export starts with a
   * group header row, like the rendered header. With `manualPagination`
   * only the loaded page is exported.
   */
  enableExport?: boolean;
  /**
   * Base filename (no extension) for the exported files; also the printed
   * document title. Defaults to 'data'.
   */
  exportFilename?: string;
  /**
   * Extra export-only columns appended after the visible columns in the CSV / Excel / Print output,
   * for data shown outside the grid (e.g. data in an expandable detail row) that should still be
   * exported. Each supplies a `header` and a `(row) => value` extractor, not rendered in the table.
   */
  additionalExportColumns?: ReadonlyArray<DataTableExportColumn<TData>>;
  /**
   * Server-side filtering: rows in `data` are assumed to already match the
   * active filters and search query — the filter panel and the toolbar
   * search input only update their state, nothing is filtered client-side.
   */
  manualFiltering?: boolean;
  /**
   * Declarative filter-field spec. When provided, the toolbar's Filters button opens the built-in
   * panel rendering one control per field (text / select / multiSelect / boolean / group) from this
   * spec — the table owns the UI and derives the active-filter badge itself. State is emitted in
   * server-value terms through `onFilterStateChange`, which a consumer maps 1:1 to its query params
   * (pair with `manualFiltering`).
   */
  filterFields?: DataTableFilterField[];
  /**
   * Initial filter state for `filterFields`. Defaults to every field cleared. What the panel's
   * "Clear all" restores.
   */
  initialFilterState?: DataTableFilterState;
  /**
   * Controlled filter state for `filterFields` (pair with `onFilterStateChange`). Takes precedence
   * over `initialFilterState`. When omitted, the state is internal.
   */
  filterState?: DataTableFilterState;
  /**
   * Called with the next filter state when a `filterFields` control changes. With `manualFiltering`,
   * map the state to the server query in response (and usually reset the page to 0).
   */
  onFilterStateChange?: (state: DataTableFilterState) => void;
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
  /**
   * Min width of the table itself (any CSS width value). When it exceeds
   * the container width, the table scrolls horizontally — which is what
   * gives pinned columns something to stick over. Defaults to 650.
   */
  minWidth?: number | string;
  /** Max height of the scroll container. Defaults to 800. */
  maxHeight?: number | string;
  /**
   * Table layout algorithm. With the default 'auto', column widths are
   * hints and content can stretch a column. Use 'fixed' to enforce the
   * exact px/percentage widths set via column meta — content that cannot
   * fit (e.g. long unbreakable strings) is clipped with an ellipsis
   * instead of leaking over the neighboring cells.
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
