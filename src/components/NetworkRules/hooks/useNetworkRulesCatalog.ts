import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRuleCatalog } from '../types';

const CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function useNetworkRulesCatalog(): UseQueryResult<NetworkRuleCatalog> {
  const { scope, getCatalog } = useNetworkRulesServices();

  return useQuery({
    queryKey: ['network-rules', scope, 'catalog'],
    queryFn: async ({ signal }) => await getCatalog(signal),
    staleTime: CATALOG_STALE_TIME_MS,
  });
}
