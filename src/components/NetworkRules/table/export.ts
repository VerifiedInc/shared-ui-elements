import type { DataTableExportSection } from '../../DataTable/DataTable.export';

import type { NetworkRule, NetworkRuleCatalog } from '../types';
import {
  getKeyDef,
  getKeyLabel,
  getOperatorLabel,
  hasInlineOptions,
  toOptions,
} from '../utils/catalog';
import {
  formatMetadataValue,
  metadataTypeLabel,
  typeOfMetadataValue,
} from '../utils/metadata';

/**
 * Condition values as one cell. Inline options carry their label; a remote source resolves its
 * labels asynchronously, which an export cannot wait for, so those keep the stored value.
 */
function formatConditionValues(
  catalog: NetworkRuleCatalog | undefined,
  key: string,
  values: readonly string[],
): string {
  const keyDef = getKeyDef(catalog, key);
  const options = hasInlineOptions(keyDef) ? keyDef.values.options : [];
  return toOptions(values, options)
    .map((option) => option.label)
    .join(', ');
}

/**
 * What the rule's expanded panel shows, for `DataTable`'s `exportRowDetails`: its conditions and
 * its metadata, each as its own block under the rule's row.
 */
export function buildNetworkRuleExportSections(
  rule: NetworkRule,
  catalog?: NetworkRuleCatalog,
): DataTableExportSection[] {
  const conditions = rule.conditions.map((condition) => ({
    key: getKeyLabel(catalog, condition.key),
    operator: getOperatorLabel(catalog, condition.operator),
    values: formatConditionValues(catalog, condition.key, condition.values),
  }));

  const metadata = Object.entries(rule.metadata ?? {}).map(([key, value]) => ({
    key,
    type: metadataTypeLabel(typeOfMetadataValue(value)),
    value: formatMetadataValue(value),
  }));

  // `rows` is the table print nests under the rule; `lines` is the same block once a sheet
  // collapses it into one cell.
  return [
    {
      title: 'Conditions',
      header: ['Key', 'Operator', 'Values'],
      emptyMessage: 'No conditions',
      rows: conditions.map(({ key, operator, values }) => [
        key,
        operator,
        values,
      ]),
      lines: conditions.map(
        ({ key, operator, values }) => `${key} ${operator} ${values}`,
      ),
    },
    {
      title: 'Metadata',
      header: ['Key', 'Type', 'Value'],
      emptyMessage: 'No metadata',
      rows: metadata.map(({ key, type, value }) => [key, type, value]),
      lines: metadata.map(({ key, value }) => `${key}: ${value}`),
    },
  ];
}
