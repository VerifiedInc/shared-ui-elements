import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRuleCatalog } from '../types';

export const NETWORK_RULES_CATALOG_QUERY_KEY = [
  'network-rules',
  'catalog',
] as const;

const CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function useNetworkRulesCatalog(): UseQueryResult<NetworkRuleCatalog> {
  const { getCatalog } = useNetworkRulesServices();

  return useQuery({
    queryKey: NETWORK_RULES_CATALOG_QUERY_KEY,
    queryFn: async ({ signal }) => await getCatalog(signal),
    staleTime: CATALOG_STALE_TIME_MS,
  });
}
