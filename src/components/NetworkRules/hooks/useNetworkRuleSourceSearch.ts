import { useMemo } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { useDebounceValue } from '../../../hooks/useDebounceValue';

import { useNetworkRulesServices } from '../NetworkRules.context';
import type { NetworkRuleOption, NetworkRuleSourceService } from '../types';

export interface UseNetworkRuleSourceSearchOptions {
  /** Page size. Defaults to 20. */
  limit?: number;
  /** Defaults to 300ms. */
  debounceMs?: number;
  /** False holds the query, e.g. while the list is closed. */
  enabled?: boolean;
}

export interface UseNetworkRuleSourceSearchResult {
  /** Every page loaded so far, in order. */
  options: NetworkRuleOption[];
  /** The first page is loading. */
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  /** False when no service is registered under `source`. */
  isSupported: boolean;
  service: NetworkRuleSourceService | undefined;
  error: unknown;
  /** Re-runs the current search after a failure. */
  retry: () => void;
}

/** Paged search-as-you-type against `services.sources[source]`. */
export function useNetworkRuleSourceSearch(
  source: string | undefined,
  search: string,
  {
    limit = 20,
    debounceMs = 300,
    enabled = true,
  }: UseNetworkRuleSourceSearchOptions = {},
): UseNetworkRuleSourceSearchResult {
  const { scope, sources } = useNetworkRulesServices();
  const service: NetworkRuleSourceService | undefined = source
    ? sources?.[source]
    : undefined;
  const debouncedSearch = useDebounceValue(search.trim(), debounceMs);

  const query = useInfiniteQuery({
    queryKey: [
      'network-rules',
      scope,
      'source',
      source,
      debouncedSearch,
      limit,
    ],
    queryFn: async ({ pageParam, signal }) => {
      if (!service) return [];
      return await service.search(
        { search: debouncedSearch || undefined, limit, skip: pageParam },
        signal,
      );
    },
    initialPageParam: 0,
    // A short page means the source ran out.
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < limit
        ? undefined
        : pages.reduce((count, page) => count + page.length, 0),
    enabled: enabled && service !== undefined,
    placeholderData: keepPreviousData,
  });

  const options = useMemo(() => {
    const byValue = new Map<string, NetworkRuleOption>();
    for (const option of query.data?.pages.flat() ?? []) {
      if (!byValue.has(option.value)) byValue.set(option.value, option);
    }
    return [...byValue.values()];
  }, [query.data]);

  const {
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = query;

  return {
    options,
    isLoading: isFetching && !isFetchingNextPage,
    isLoadingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: () => {
      if (hasNextPage && !isFetching) void fetchNextPage();
    },
    isSupported: service !== undefined,
    service,
    error: query.error,
    retry: () => {
      void refetch();
    },
  };
}
