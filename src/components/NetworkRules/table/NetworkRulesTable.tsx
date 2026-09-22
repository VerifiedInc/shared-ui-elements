import { useCallback, useMemo } from 'react';
import { Alert, Box, Button } from '@mui/material';

import { DataTable } from '../../DataTable/DataTable';
import type { DataTableExportColumn } from '../../DataTable/DataTable.export';
import type { DataTableProps } from '../../DataTable/DataTable.types';
import { EXPAND_COLUMN_ID } from '../../DataTable/DataTableExpandRow';
import { DataTableLoadingRows } from '../../DataTable/DataTableLoadingRows';

import {
  useNetworkRulesServices,
  useNetworkRuleStatuses,
} from '../NetworkRules.context';
import { useNetworkRulesCatalog } from '../hooks/useNetworkRulesCatalog';
import type { NetworkRule } from '../types';
import { buildNetworkRulesColumns, NETWORK_RULES_COLUMN_IDS } from './columns';
import { buildNetworkRuleExportSections } from './export';
import { buildNetworkRulesFilterFields } from './filters';
import type { NetworkRuleRowHandlers } from './NetworkRuleExpandedPanel';
import { NetworkRuleRow } from './NetworkRuleRow';

// Shown in the expanded panel rather than the grid, so the export adds it as its own column —
// first, being what identifies the rule.
const NETWORK_RULES_EXPORT_COLUMNS: ReadonlyArray<
  DataTableExportColumn<NetworkRule>
> = [{ header: 'Rule UUID', value: (rule) => rule.uuid, position: 'start' }];

/**
 * Paging, filtering, search and sorting state, passed through to the DataTable. With the `manual*`
 * flags the consumer fetches in response; `buildNetworkRulesListQuery` maps the state to the query.
 */
type ListStateProps = Pick<
  DataTableProps<NetworkRule>,
  | 'pagination'
  | 'onPaginationChange'
  | 'manualPagination'
  | 'rowCount'
  | 'pageSizeOptions'
  | 'manualFiltering'
  | 'filterState'
  | 'onFilterStateChange'
  | 'search'
  | 'onSearchChange'
  | 'manualSorting'
  | 'sorting'
  | 'onSortingChange'
>;

export interface NetworkRulesTableProps
  extends NetworkRuleRowHandlers, ListStateProps {
  rules: NetworkRule[];
  isLoading?: boolean;
  /** No toggle, no row actions. */
  readOnly?: boolean;
  emptyMessage?: string;
  /** Toolbar export: Print, CSV, Excel and the rules as JSON. Defaults to true. */
  enableExport?: boolean;
  /** Base name of the exported file. Defaults to `network-rules`. */
  exportFilename?: string;
  /** Defaults to 640. `'100%'` fills a parent with a definite height. */
  maxHeight?: number | string;
  /** Defaults to 900. */
  minWidth?: number | string;
}

export function NetworkRulesTable({
  rules,
  isLoading = false,
  readOnly = false,
  emptyMessage = 'No network rules yet',
  maxHeight = 640,
  minWidth = 900,
  pagination,
  onPaginationChange,
  manualPagination,
  rowCount,
  pageSizeOptions,
  manualFiltering,
  filterState,
  onFilterStateChange,
  search,
  onSearchChange,
  manualSorting,
  sorting,
  onSortingChange,
  enableExport = true,
  exportFilename = 'network-rules',
  ...handlers
}: Readonly<NetworkRulesTableProps>) {
  const { sources } = useNetworkRulesServices();
  const catalogQuery = useNetworkRulesCatalog();
  const catalog = catalogQuery.data;
  const statuses = useNetworkRuleStatuses() ?? catalog?.statuses ?? [];
  const catalogReady = catalog !== undefined;
  const columns = useMemo(() => buildNetworkRulesColumns(), []);
  const filterFields = useMemo(
    () => buildNetworkRulesFilterFields(catalog, statuses, sources),
    [catalog, statuses, sources],
  );
  const fillHeight = maxHeight === '100%';
  // The rule's uuid and its panel sub-tables live outside the grid; the export carries them too.
  const exportRowDetails = useCallback(
    (rule: NetworkRule) => buildNetworkRuleExportSections(rule, catalog),
    [catalog],
  );

  if (!catalogReady && catalogQuery.isError) {
    return (
      <Alert
        severity='error'
        action={
          <Button
            color='inherit'
            size='small'
            onClick={() => {
              void catalogQuery.refetch();
            }}
          >
            Retry
          </Button>
        }
      >
        The rule catalog could not be loaded, so rules cannot be shown.
      </Alert>
    );
  }

  return (
    <Box sx={fillHeight ? { height: '100%', minHeight: 0 } : undefined}>
      <DataTable
        data={catalogReady ? rules : []}
        columns={columns}
        getRowId={(rule) => rule.uuid}
        isLoading={isLoading || !catalogReady}
        initialPageSize={10}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        manualPagination={manualPagination}
        rowCount={rowCount}
        pageSizeOptions={pageSizeOptions}
        manualFiltering={manualFiltering}
        filterState={filterState}
        onFilterStateChange={onFilterStateChange}
        search={search}
        onSearchChange={onSearchChange}
        manualSorting={manualSorting}
        sorting={sorting}
        onSortingChange={onSortingChange}
        showToolbar
        enableExport={enableExport}
        enableJsonExport
        exportFilename={exportFilename}
        additionalExportColumns={NETWORK_RULES_EXPORT_COLUMNS}
        exportRowDetails={exportRowDetails}
        enableColumnMenu
        enableColumnResizing
        enableColumnPinning
        initialColumnPinning={{
          left: [
            EXPAND_COLUMN_ID,
            NETWORK_RULES_COLUMN_IDS.enabled,
            NETWORK_RULES_COLUMN_IDS.name,
          ],
          right: [],
        }}
        filterFields={filterFields}
        tableLayout='fixed'
        minWidth={minWidth}
        maxHeight={maxHeight}
        emptyMessage={emptyMessage}
        renderRow={(context) => (
          <NetworkRuleRow
            {...context}
            catalog={catalog}
            readOnly={readOnly}
            {...handlers}
          />
        )}
        renderLoading={(columnCount: number) => (
          <DataTableLoadingRows columnCount={columnCount} />
        )}
      />
    </Box>
  );
}
