import type {
  DataTableFilterField,
  DataTableFilterOperator,
  DataTableFilterOption,
} from '../../DataTable/DataTable.types';

import type {
  NetworkRuleCatalog,
  NetworkRuleKeyDef,
  NetworkRuleOption,
  NetworkRulesServices,
} from '../types';
import {
  getPresets,
  getStatusLabel,
  hasInlineOptions,
  hasRemoteSource,
  isOperatorMulti,
} from '../utils/catalog';
import { NETWORK_RULES_COLUMN_IDS } from './columns';

export const NETWORK_RULES_FILTER_IDS = {
  status: NETWORK_RULES_COLUMN_IDS.status,
  enabled: NETWORK_RULES_COLUMN_IDS.enabled,
  /** "Has a condition on" any of the selected keys. */
  conditionKey: 'conditionKey',
} as const;

const CONDITION_PREFIX = 'condition.';

/** The filter id matching the values of one condition key. */
export function conditionFilterId(key: string): string {
  return `${CONDITION_PREFIX}${key}`;
}

/** The condition key behind a filter id, or undefined for any other field. */
export function conditionFilterKey(filterId: string): string | undefined {
  return filterId.startsWith(CONDITION_PREFIX)
    ? filterId.slice(CONDITION_PREFIX.length)
    : undefined;
}

/** The text operators the rules list accepts; the first is the default. */
export const NETWORK_RULES_TEXT_OPERATORS: DataTableFilterOperator[] = [
  'contains',
  'equals',
  'startsWith',
  'endsWith',
];

/** How many remote options one search returns. */
const SOURCE_SEARCH_LIMIT = 20;

/** A pick-list option: the label with the code it is stored as, as the editor shows it. */
const toCodeOption = (option: NetworkRuleOption): DataTableFilterOption => ({
  value: option.value,
  label: option.label,
  caption: option.value,
});

/** The same for a searched option, with the logo its source returned, or the label's initial. */
const toLogoOption = (option: NetworkRuleOption): DataTableFilterOption => ({
  ...toCodeOption(option),
  logoUrl: option.logoUrl ?? null,
});

/**
 * One filter per catalog key, with the control the key's shape implies — the same branching the
 * editor's value input uses: a pick-list for inline options, a searched list for a remote source,
 * free text otherwise. A key whose every operator takes a single value filters by one value.
 */
function buildConditionField(
  catalog: NetworkRuleCatalog | undefined,
  keyDef: NetworkRuleKeyDef,
  sources: NetworkRulesServices['sources'],
): DataTableFilterField | undefined {
  const id = conditionFilterId(keyDef.key);
  const label = keyDef.label;
  const multi = keyDef.operators.some((operator) =>
    isOperatorMulti(catalog, operator),
  );

  if (hasInlineOptions(keyDef)) {
    return {
      id,
      label,
      kind: multi ? 'multiSelect' : 'select',
      options: keyDef.values.options.map(toCodeOption),
      selectAllClears: false,
    };
  }

  if (hasRemoteSource(keyDef)) {
    const source = sources?.[keyDef.values.source];
    // Without a service there is nothing to search, so the key is left to "Has Condition with Key".
    if (!source) return undefined;

    return {
      id,
      label,
      // Only the loaded page is ever known, so the pick is a set of values to match.
      kind: 'multiSelect',
      selectAllClears: false,
      placeholder: source.searchPlaceholder,
      loadOptions: async (search) => {
        const options = await source.search({
          search: search.trim() || undefined,
          limit: SOURCE_SEARCH_LIMIT,
        });
        return options.map(toLogoOption);
      },
    };
  }

  // Free text: one term matched against what the condition stores, with the brand's presets for
  // the key offered as suggestions.
  return {
    id,
    label,
    kind: 'text',
    operators: NETWORK_RULES_TEXT_OPERATORS,
    options: getPresets(catalog, keyDef.key).map((preset) => ({
      label: preset,
      value: preset,
    })),
  };
}

/**
 * The table's filter controls: the rule's own status and enabled flag, then what the rule checks —
 * which keys it has a condition on, and the values of each key.
 */
export function buildNetworkRulesFilterFields(
  catalog: NetworkRuleCatalog | undefined,
  statuses: readonly string[],
  sources?: NetworkRulesServices['sources'],
): DataTableFilterField[] {
  const keys = catalog?.keys ?? [];

  return [
    {
      id: NETWORK_RULES_FILTER_IDS.status,
      label: 'Status',
      kind: 'multiSelect',
      columnId: NETWORK_RULES_COLUMN_IDS.status,
      // Every value picked is every value sent, so the panel's badge matches the query.
      selectAllClears: false,
      options: statuses.map((status) => ({
        label: getStatusLabel(status),
        value: status,
      })),
    },
    {
      id: NETWORK_RULES_FILTER_IDS.enabled,
      label: 'Enabled',
      kind: 'boolean',
      columnId: NETWORK_RULES_COLUMN_IDS.enabled,
    },
    {
      id: NETWORK_RULES_FILTER_IDS.conditionKey,
      label: 'Has Condition with Key',
      kind: 'multiSelect',
      selectAllClears: false,
      options: keys.map((keyDef) => ({
        label: keyDef.label,
        value: keyDef.key,
      })),
    },
    ...keys.flatMap((keyDef) => {
      const field = buildConditionField(catalog, keyDef, sources);
      return field ? [field] : [];
    }),
  ];
}
