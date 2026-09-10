import type { ColumnDef, Row } from '@tanstack/react-table';

import { expandColumn } from '../../DataTable/DataTableExpandRow';

import type { NetworkRule } from '../types';
import { getStatusLabel } from '../utils/catalog';
import { formatRuleDate } from '../utils/date';

export const NETWORK_RULES_COLUMN_IDS = {
  enabled: 'enabled',
  name: 'name',
  conditions: 'conditions',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  notes: 'notes',
} as const;

// Missing dates sort last.
function byRuleDate(
  pick: (rule: NetworkRule) => string | null | undefined,
): (a: Row<NetworkRule>, b: Row<NetworkRule>) => number {
  const value = (row: Row<NetworkRule>): string =>
    pick(row.original) ?? '9999-99-99';
  return (a, b) => value(a).localeCompare(value(b));
}

// Accessors return what the cell displays, so search, filters and exports see the same text.
export function buildNetworkRulesColumns(): Array<
  ColumnDef<NetworkRule, unknown>
> {
  return [
    expandColumn<NetworkRule>(),
    {
      id: NETWORK_RULES_COLUMN_IDS.enabled,
      header: 'Enabled',
      accessorFn: (rule) => rule.enabled ?? true,
      enableSorting: false,
      enableColumnFilter: false,
      enableResizing: false,
      meta: { width: 100, disableColumnMenu: true },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.name,
      header: 'Rule Name',
      accessorFn: (rule) => rule.name,
      enableSorting: true,
      enableColumnFilter: false,
      meta: { width: 300 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.conditions,
      header: 'Conditions',
      accessorFn: (rule) => rule.conditions.length,
      enableSorting: true,
      enableColumnFilter: false,
      meta: { width: 140 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.status,
      header: 'Status',
      accessorFn: (rule) => getStatusLabel(rule.status),
      enableSorting: true,
      enableColumnFilter: false,
      meta: { width: 200 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.startDate,
      header: 'Starts',
      accessorFn: (rule) => formatRuleDate(rule.startDate) ?? '-',
      sortingFn: byRuleDate((rule) => rule.startDate),
      enableSorting: true,
      enableColumnFilter: false,
      meta: { width: 280 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.endDate,
      header: 'Ends',
      accessorFn: (rule) => formatRuleDate(rule.endDate) ?? '-',
      sortingFn: byRuleDate((rule) => rule.endDate),
      enableSorting: true,
      enableColumnFilter: false,
      meta: { width: 280 },
    },
    {
      id: NETWORK_RULES_COLUMN_IDS.notes,
      header: 'Notes',
      accessorFn: (rule) => rule.notes ?? '-',
      enableSorting: false,
      enableColumnFilter: false,
      meta: { width: 300 },
    },
  ];
}
