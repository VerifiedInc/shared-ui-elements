import type { SortingState } from '@tanstack/react-table';

import type {
  DataTableFilterFieldValue,
  DataTableFilterState,
} from '../../DataTable/DataTable.types';

import { conditionFilterKey, NETWORK_RULES_FILTER_IDS } from './filters';

/** The list API caps a search or text term at this length. */
const MAX_TERM_LENGTH = 120;

/** What a free-text key must match, and how. */
export type NetworkRuleTextFilter = { value: string; operator?: string };

/**
 * Filters over what a rule checks: `key` is "has a condition on any of these"; an enum key takes
 * the code itself, or several codes as an inclusive OR; a free-text key takes a term and operator.
 */
export type NetworkRuleConditionFilter = { key?: string[] } & Record<
  string,
  string | string[] | NetworkRuleTextFilter | undefined
>;

/** The rules list query the table's filters, search and sorting map to, ready to send as-is. */
export type NetworkRulesListQuery = {
  status?: { $in: string[] };
  enabled?: boolean;
  condition?: NetworkRuleConditionFilter;
  search?: string;
  $sort?: Record<string, 1 | -1>;
};

const term = (value: string): string | undefined => {
  const trimmed = value.trim().slice(0, MAX_TERM_LENGTH);
  return trimmed === '' ? undefined : trimmed;
};

/** One code goes as itself, several as a list the server reads as an inclusive OR. */
function toCodes(values: readonly string[]): string | string[] | undefined {
  const codes = values
    .map(term)
    .filter((entry): entry is string => entry !== undefined);

  if (codes.length === 0) return undefined;

  return codes.length === 1 ? codes[0] : codes;
}

/** What one condition control asks of its key, whichever control the key's shape gave it. */
function toConditionFilter(
  value: DataTableFilterFieldValue,
): string | string[] | NetworkRuleTextFilter | undefined {
  switch (value.kind) {
    case 'multiSelect':
      return toCodes(value.values);
    case 'select':
      return value.value === null ? undefined : toCodes([value.value]);
    case 'text': {
      const text = term(value.value);
      return text === undefined
        ? undefined
        : { value: text, operator: value.operator };
    }
    default:
      return undefined;
  }
}

/** The filters over what a rule checks: the key presence filter, then one entry per key control. */
function buildConditionFilter(
  filterState: DataTableFilterState,
): NetworkRuleConditionFilter | undefined {
  const condition: NetworkRuleConditionFilter = {};

  for (const [id, value] of Object.entries(filterState)) {
    const key = conditionFilterKey(id);
    const filter = key === undefined ? undefined : toConditionFilter(value);

    if (key !== undefined && filter !== undefined) {
      condition[key] = filter;
    }
  }

  const keys = filterState[NETWORK_RULES_FILTER_IDS.conditionKey];
  if (keys?.kind === 'multiSelect' && keys.values.length > 0) {
    condition.key = keys.values;
  }

  return Object.keys(condition).length === 0 ? undefined : condition;
}

/**
 * Maps the table's filter state, quick search and sorting to the list query. Cleared controls add
 * nothing, so an untouched table sends an empty query.
 */
export function buildNetworkRulesListQuery({
  filterState = {},
  search = '',
  sorting = [],
}: {
  filterState?: DataTableFilterState;
  search?: string;
  sorting?: SortingState;
}): NetworkRulesListQuery {
  const query: NetworkRulesListQuery = {};

  const status = filterState[NETWORK_RULES_FILTER_IDS.status];
  if (status?.kind === 'multiSelect' && status.values.length > 0) {
    query.status = { $in: status.values };
  }

  const enabled = filterState[NETWORK_RULES_FILTER_IDS.enabled];
  if (enabled?.kind === 'boolean' && enabled.value !== null) {
    query.enabled = enabled.value;
  }

  const condition = buildConditionFilter(filterState);
  if (condition !== undefined) query.condition = condition;

  const searchTerm = term(search);
  if (searchTerm !== undefined) query.search = searchTerm;

  const [sort] = sorting;
  if (sort !== undefined) query.$sort = { [sort.id]: sort.desc ? -1 : 1 };

  return query;
}
