import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRuleCatalog } from '../types';

const CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

/** Invalidate it after writing presets, since they ride on the catalog. */
export const networkRulesCatalogQueryKey = (scope?: string) =>
  ['network-rules', scope, 'catalog'] as const;

export function useNetworkRulesCatalog(): UseQueryResult<NetworkRuleCatalog> {
  const { scope, getCatalog } = useNetworkRulesServices();

  return useQuery({
    queryKey: networkRulesCatalogQueryKey(scope),
    queryFn: async ({ signal }) => await getCatalog(signal),
    staleTime: CATALOG_STALE_TIME_MS,
  });
}
