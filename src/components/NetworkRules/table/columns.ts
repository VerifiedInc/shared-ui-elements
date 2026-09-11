import type { CellContext, ColumnDef } from '@tanstack/react-table';

import { expandColumn } from '../../DataTable/DataTableExpandRow';

import type { NetworkRule } from '../types';
import { formatRuleDate } from '../utils/date';

export const NETWORK_RULES_COLUMN_IDS = {
  enabled: 'enabled',
  name: 'name',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  notes: 'notes',
} as const;

const dashWhenEmpty = ({
  getValue,
}: CellContext<NetworkRule, unknown>): string =>
  getValue<string | undefined>() ?? '-';

// Accessors return what the cell displays, so search and filters see the same text; status is the
// exception, its code is what the status filter carries. Sorting is on for the columns the rules
// API sorts by.
export function buildNetworkRulesColumns(): Array<
  ColumnDef<NetworkRule, unknown>
> {
  return [
    expandColumn<NetworkRule>(),
    {
      id: NETWORK_RULES_COLUMN_IDS.enabled,
      header: 'Enabled',
      accessorFn: (rule) => rule.enabled ?? true,
      enableColumnFilter: false,
      enableResizing: false,
      enableSorting: true,
      meta: { width: 100, disableColumnMenu: true },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.name,
      header: 'Rule Name',
      accessorFn: (rule) => rule.name,
      enableColumnFilter: false,
      enableSorting: true,
      meta: { width: 320 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.status,
      header: 'Status',
      accessorFn: (rule) => rule.status,
      enableColumnFilter: false,
      enableSorting: true,
      meta: { width: 200 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.startDate,
      header: 'Starts',
      accessorFn: (rule) => formatRuleDate(rule.startDate) ?? undefined,
      cell: dashWhenEmpty,
      enableColumnFilter: false,
      meta: { width: 280 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.endDate,
      header: 'Ends',
      accessorFn: (rule) => formatRuleDate(rule.endDate) ?? undefined,
      cell: dashWhenEmpty,
      enableColumnFilter: false,
      meta: { width: 280 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.notes,
      header: 'Notes',
      accessorFn: (rule) => rule.notes ?? '-',
      enableColumnFilter: false,
      meta: { width: 300 },
    },
  ];
}
