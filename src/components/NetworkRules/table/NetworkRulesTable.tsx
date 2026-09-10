import { useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  Skeleton,
  TableCell,
  TableRow,
} from '@mui/material';

import { DataTable } from '../../DataTable/DataTable';
import type { DataTableExportColumn } from '../../DataTable/DataTable.export';
import type { DataTableFilterField } from '../../DataTable/DataTable.types';
import { EXPAND_COLUMN_ID } from '../../DataTable/DataTableExpandRow';

import { useNetworkRuleStatuses } from '../NetworkRules.context';
import { useNetworkRulesCatalog } from '../hooks/useNetworkRulesCatalog';
import type { NetworkRule, NetworkRuleCatalog } from '../types';
import {
  getKeyLabel,
  getOperatorLabel,
  getStatusLabel,
} from '../utils/catalog';
import { normalizeConditionValues } from '../utils/condition';
import { buildNetworkRulesColumns, NETWORK_RULES_COLUMN_IDS } from './columns';
import type { NetworkRuleRowHandlers } from './NetworkRuleExpandedPanel';
import { NetworkRuleRow } from './NetworkRuleRow';

const SKELETON_ROWS = 4;

export interface NetworkRulesTableProps extends NetworkRuleRowHandlers {
  rules: NetworkRule[];
  isLoading?: boolean;
  /** No toggle, no row or condition actions. */
  readOnly?: boolean;
  emptyMessage?: string;
  /** Defaults to 640. `'100%'` fills a parent with a definite height. */
  maxHeight?: number | string;
  /** Defaults to 900. */
  minWidth?: number | string;
  /** Defaults to 'network-rules'. */
  exportFilename?: string;
}

function buildFilterFields(
  statuses: readonly string[],
): DataTableFilterField[] {
  return [
    {
      id: NETWORK_RULES_COLUMN_IDS.status,
      label: 'Status',
      kind: 'multiSelect',
      columnId: NETWORK_RULES_COLUMN_IDS.status,
      options: statuses.map((status) => {
        const label = getStatusLabel(status);
        return { label, value: label };
      }),
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.enabled,
      label: 'Enabled',
      kind: 'boolean',
      columnId: NETWORK_RULES_COLUMN_IDS.enabled,
    },
  ];
}

// Export-only columns for what the grid shows inside the expanded row.
function buildExportColumns(
  catalog: NetworkRuleCatalog | undefined,
): Array<DataTableExportColumn<NetworkRule>> {
  return [
    { header: 'Rule UUID', value: (rule) => rule.uuid },
    {
      header: 'Condition Details',
      value: (rule) =>
        rule.conditions
          .map(
            (condition) =>
              `${getKeyLabel(catalog, condition.key)} ${getOperatorLabel(
                catalog,
                condition.operator,
              )} ${normalizeConditionValues(condition.value).join(' | ')}`,
          )
          .join('; '),
    },
  ];
}

/**
 * One expandable row per rule. Presentation only: every change is reported
 * through a callback. Rows render once the catalog is available, so codes
 * never flash before their labels.
 */
export function NetworkRulesTable({
  rules,
  isLoading = false,
  readOnly = false,
  emptyMessage = 'No network rules yet',
  maxHeight = 640,
  minWidth = 900,
  exportFilename = 'network-rules',
  ...handlers
}: Readonly<NetworkRulesTableProps>) {
  const catalogQuery = useNetworkRulesCatalog();
  const catalog = catalogQuery.data;
  const statuses = useNetworkRuleStatuses() ?? catalog?.statuses ?? [];
  const catalogReady = catalog !== undefined;
  const columns = useMemo(() => buildNetworkRulesColumns(), []);
  const filterFields = useMemo(() => buildFilterFields(statuses), [statuses]);
  const exportColumns = useMemo(() => buildExportColumns(catalog), [catalog]);
  const fillHeight = maxHeight === '100%';

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
        disablePagination
        showToolbar
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
        enableExport
        exportFilename={exportFilename}
        additionalExportColumns={exportColumns}
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
          <>
            {Array.from({ length: SKELETON_ROWS }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columnCount }, (_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton variant='text' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </>
        )}
      />
    </Box>
  );
}
