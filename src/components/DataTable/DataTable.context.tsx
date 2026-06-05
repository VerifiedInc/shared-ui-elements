import { createContext, useContext } from 'react';
import type {
  CSSProperties,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  RefObject,
  TouchEvent,
} from 'react';

import type {
  Cell,
  ColumnPinningPosition,
  Header,
  OnChangeFn,
  Row,
  Table,
} from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';

import type {
  DataTableActiveFilters,
  DataTableBidirectionalScroll,
  DataTableCellProps,
  DataTableData,
  DataTableIcons,
  DataTableRowContext,
} from './DataTable.types';

/** Where a floating panel opens and which of its top corners pins there. */
export type DataTablePanelAnchor = {
  anchorPosition: { top: number; left: number };
  transformHorizontal: 'left' | 'right';
};

/**
 * One floating column panel is open at a time: a column's kebab menu
 * (anchored to its button), or the filter / manage columns panels
 * (anchored to a position snapshot, since they can outlive the element
 * that opened them). With the toolbar shown, those two panels anchor to
 * their toolbar button instead, wherever they were opened from.
 */
export type DataTableColumnPanelState =
  | { type: 'menu'; columnId: string; anchorEl: HTMLElement }
  | ({ type: 'filter'; columnId: string } & DataTablePanelAnchor)
  | ({ type: 'manageColumns' } & DataTablePanelAnchor)
  | null;

/**
 * Everything the DataTable subcomponents (toolbar, head, body, footer,
 * floating panels) read from the root component. The value is rebuilt on
 * every DataTable render — the same cadence the single-component render
 * had — so it is intentionally not memoized.
 */
export interface DataTableContextValue<TData extends DataTableData> {
  /** TanStack table instance. */
  table: Table<TData>;
  /** Unfiltered rows — the filter panel derives value suggestions from them. */
  data: TData[];
  /** Rows of the current page (or all rows when pagination is disabled). */
  rows: Array<Row<TData>>;
  /** Total row count across every page — drives the pagination footer. */
  totalRowCount: number;
  /**
   * Visible leaf column count — drives the colSpan of full-width rows
   * (loading, empty, dividers, virtualizer padding).
   */
  columnCount: number;

  // Resolved props shared across the subtree.
  icons: DataTableIcons;
  isLoading: boolean;
  emptyMessage: string;
  tableLayout: 'auto' | 'fixed';
  enableColumnResizing: boolean;
  enableColumnMenu: boolean;
  enableExport: boolean;
  exportFilename: string;
  disablePagination: boolean;
  pageSizeOptions: number[];
  footerLeft?: ReactNode;
  bidirectionalScroll?: DataTableBidirectionalScroll;
  renderLoading?: (columnCount: number) => ReactNode;
  renderRow?: (context: DataTableRowContext<TData>) => ReactNode;

  // Filter & quick-search state (controlled or internal — see
  // useControllableState).
  filters: DataTableActiveFilters;
  onFiltersChange: OnChangeFn<DataTableActiveFilters>;
  search: string;
  onSearchChange: OnChangeFn<string>;

  // Floating panel state and the anchors the panels open against.
  columnPanel: DataTableColumnPanelState;
  setColumnPanel: (panel: DataTableColumnPanelState) => void;
  closeColumnPanel: () => void;
  openFilterPanel: (columnId: string, opener: HTMLElement) => void;
  openManageColumnsPanel: (opener: HTMLElement) => void;
  toolbarFilterButtonRef: RefObject<HTMLButtonElement>;
  toolbarManageColumnsButtonRef: RefObject<HTMLButtonElement>;

  // Header measurement — refs are attached by the head, measured by the
  // root's layout effects.
  headerRowRefs: MutableRefObject<Array<HTMLTableRowElement | null>>;
  headerCellRefs: MutableRefObject<Record<string, HTMLTableCellElement | null>>;
  /** Sticky top offsets of the header rows below the first (grouped headers). */
  headerRowTops: number[];
  /**
   * Measured total header height — the loading-newer indicator sticks
   * right below it. 0 unless bidirectional scroll is active.
   */
  headerHeight: number;

  // Column pinning helpers.
  isPinnedEdge: (pinned: ColumnPinningPosition, columnId: string) => boolean;
  getPinnedOffsetStyle: (
    pinned: ColumnPinningPosition,
    columnId: string,
  ) => CSSProperties | undefined;
  getCellProps: (cell: Cell<TData, unknown>) => DataTableCellProps;

  // Column resizing.
  hasResizedColumns: boolean;
  startColumnResize: (
    header: Header<TData, unknown>,
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
  ) => void;

  // Row virtualization.
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

// A single React context cannot be generic, so the value is stored under
// the base DataTableData shape — the provider and the hook cast through
// `unknown`. Safe because the value is only ever produced by
// <DataTable<TData>/> and read back under the same shape.
const DataTableContext =
  createContext<DataTableContextValue<DataTableData> | null>(null);

interface DataTableProviderProps<TData extends DataTableData> {
  value: DataTableContextValue<TData>;
  children: ReactNode;
}

export function DataTableProvider<TData extends DataTableData>({
  value,
  children,
}: Readonly<DataTableProviderProps<TData>>) {
  return (
    <DataTableContext.Provider
      value={value as unknown as DataTableContextValue<DataTableData>}
    >
      {children}
    </DataTableContext.Provider>
  );
}

/**
 * Reads the enclosing DataTable's context. Subcomponents default to the
 * base `DataTableData` row shape; pass the concrete `TData` when a typed
 * view is needed.
 */
export function useDataTableContext<
  TData extends DataTableData = DataTableData,
>(): DataTableContextValue<TData> {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error('useDataTableContext must be used within a <DataTable/>');
  }

  return context as unknown as DataTableContextValue<TData>;
}
