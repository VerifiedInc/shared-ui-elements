import type { DataTableProps } from '../../DataTable/DataTable.types';

/**
 * One row: a network rule as a rules API returns it, with the Matches and Conflicts a metrics
 * source counted over the selected period. Only the fields the table shows are required, so the
 * Dashboard and Mission Control rows both drop straight in.
 */
export type NetworkRulesMetricsTableRow = {
  uuid: string;
  name: string;
  /** Status code; the chip maps the known ones to their label, color and icon. */
  status: string;
  notes?: string | null;
  /** Only how many there are is shown, as a chip next to the name. */
  conditions: readonly unknown[];
  /** Coverages the rule's conditions held for. */
  matches: number;
  /** Those matches at least one other rule also matched. */
  conflicts: number;
};

/**
 * Paging, search and sorting state, passed through to the DataTable. With the `manual*` flags the
 * consumer fetches in response.
 */
type ListStateProps = Pick<
  DataTableProps<NetworkRulesMetricsTableRow>,
  | 'pagination'
  | 'onPaginationChange'
  | 'manualPagination'
  | 'rowCount'
  | 'pageSizeOptions'
  | 'manualFiltering'
  | 'search'
  | 'onSearchChange'
  | 'manualSorting'
  | 'sorting'
  | 'onSortingChange'
  | 'enableExport'
  | 'exportFilename'
  | 'footerLeft'
  | 'cspNonce'
  | 'fetchExportPage'
  | 'exportPageSize'
  | 'enableJsonExport'
>;

export interface NetworkRulesMetricsTableProps extends ListStateProps {
  data: NetworkRulesMetricsTableRow[];
  isLoading?: boolean;
  /** A refetch over already-shown rows, e.g. the period changed: they dim until it lands. */
  isFetching?: boolean;
  emptyMessage?: string;
  /** Search, column management and (with `enableExport`) export. Defaults to true. */
  showToolbar?: boolean;
  /** Defaults to 520. `'100%'` fills a parent with a definite height. */
  maxHeight?: number | string;
  /** Defaults to 900. */
  minWidth?: number | string;
}
