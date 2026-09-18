import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRulePresets } from '../types';
import { networkRulesCatalogQueryKey } from './useNetworkRulesCatalog';

/**
 * Writes preset lists through `services.updatePresets`, then refetches the catalog they ride on.
 * The refetch is awaited, so a caller's spinner lasts until the dropdowns can show the new list.
 */
export function useUpdateNetworkRulesPresets(): UseMutationResult<
  void,
  Error,
  NetworkRulePresets
> {
  const { scope, updatePresets } = useNetworkRulesServices();
  const queryClient = useQueryClient();

  return useMutation<void, Error, NetworkRulePresets>({
    mutationFn: async (presets) => {
      if (updatePresets === undefined) {
        throw new Error('NetworkRulesServices.updatePresets is not configured');
      }
      await updatePresets(presets);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: networkRulesCatalogQueryKey(scope),
      });
    },
  });
}
