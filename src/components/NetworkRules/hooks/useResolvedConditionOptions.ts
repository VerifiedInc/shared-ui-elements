import { useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type {
  NetworkRuleKeyDef,
  NetworkRuleOption,
  NetworkRuleSourceService,
} from '../types';
import { hasInlineOptions, hasRemoteSource, toOptions } from '../utils/catalog';

const RESOLVE_STALE_TIME_MS = 5 * 60 * 1000;

export interface UseResolvedConditionOptionsParams {
  /** Options already known to the caller; never sent to `resolve`. */
  known?: readonly NetworkRuleOption[];
}

export interface UseResolvedConditionOptionsResult {
  /** One option per stored value, in the stored order. */
  options: NetworkRuleOption[];
  isLoading: boolean;
  service: NetworkRuleSourceService | undefined;
}

/**
 * Stored values → displayable options: matched from inline options, resolved
 * through the key's remote source, or labelled by themselves.
 */
export function useResolvedConditionOptions(
  keyDef: NetworkRuleKeyDef | undefined,
  values: string[],
  { known = [] }: UseResolvedConditionOptionsParams = {},
): UseResolvedConditionOptionsResult {
  const { sources } = useNetworkRulesServices();

  const inline = hasInlineOptions(keyDef);
  const source = hasRemoteSource(keyDef) ? keyDef.values.source : undefined;
  const service: NetworkRuleSourceService | undefined = source
    ? sources?.[source]
    : undefined;
  const resolve = service?.resolve;

  const unresolved = useMemo(
    () =>
      values.filter((value) => !known.some((k) => k.value === value)).sort(),
    [values, known],
  );
  const canResolve = resolve !== undefined && unresolved.length > 0;

  const query = useQuery({
    queryKey: ['network-rules', 'resolve', source, unresolved],
    queryFn: async ({ signal }) => {
      if (!resolve) return [];
      return await resolve(unresolved, signal);
    },
    enabled: canResolve,
    staleTime: RESOLVE_STALE_TIME_MS,
    placeholderData: keepPreviousData,
  });

  const options = useMemo(() => {
    if (inline) return toOptions(values, keyDef.values.options);
    return toOptions(values, [...known, ...(query.data ?? [])]);
  }, [inline, keyDef, values, known, query.data]);

  return {
    options,
    isLoading: canResolve && query.isPending,
    service,
  };
}
