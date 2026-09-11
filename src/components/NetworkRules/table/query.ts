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
  const condition: NetworkRuleConditionFilter = {};

  for (const [id, value] of Object.entries(filterState)) {
    const key = conditionFilterKey(id);

    if (key !== undefined) {
      const filter = toConditionFilter(value);
      if (filter !== undefined) condition[key] = filter;
    } else if (id === NETWORK_RULES_FILTER_IDS.status) {
      if (value.kind === 'multiSelect' && value.values.length > 0) {
        query.status = { $in: value.values };
      }
    } else if (id === NETWORK_RULES_FILTER_IDS.enabled) {
      if (value.kind === 'boolean' && value.value !== null) {
        query.enabled = value.value;
      }
    } else if (id === NETWORK_RULES_FILTER_IDS.conditionKey) {
      if (value.kind === 'multiSelect' && value.values.length > 0) {
        condition.key = value.values;
      }
    }
  }

  if (Object.keys(condition).length > 0) query.condition = condition;

  const searchTerm = term(search);
  if (searchTerm !== undefined) query.search = searchTerm;

  const [sort] = sorting;
  if (sort) query.$sort = { [sort.id]: sort.desc ? -1 : 1 };

  return query;
}
