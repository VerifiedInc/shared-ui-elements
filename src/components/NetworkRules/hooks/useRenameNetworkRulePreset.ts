import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRulePresetRename } from '../types';
import { networkRulesCatalogQueryKey } from './useNetworkRulesCatalog';

/**
 * Renames one saved preset through `services.renamePreset`, or through `updatePresets` when the
 * host has no rename of its own, then refetches the catalog the presets ride on. The refetch is
 * awaited, so a caller's spinner lasts until the dropdowns can show the new list.
 */
export function useRenameNetworkRulePreset(): UseMutationResult<
  void,
  Error,
  NetworkRulePresetRename
> {
  const { scope, renamePreset, updatePresets } = useNetworkRulesServices();
  const queryClient = useQueryClient();

  return useMutation<void, Error, NetworkRulePresetRename>({
    mutationFn: async (rename) => {
      if (renamePreset !== undefined) {
        await renamePreset(rename);
      } else if (updatePresets !== undefined) {
        await updatePresets({ [rename.field]: rename.presets });
      } else {
        throw new Error('NetworkRulesServices.updatePresets is not configured');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: networkRulesCatalogQueryKey(scope),
      });
    },
  });
}
