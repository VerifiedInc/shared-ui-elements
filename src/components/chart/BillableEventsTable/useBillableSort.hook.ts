import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

type WithMetrics = { metrics: Record<string, number> } & Record<
  string,
  unknown
>;

export function useBillableSort<T extends WithMetrics>(
  data: T[] | undefined,
  directKeys: string[],
  initialSortKey: string,
) {
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (directKeys.includes(sortKey)) {
        aValue = (a[sortKey] as string | number) ?? '';
        bValue = (b[sortKey] as string | number) ?? '';
      } else {
        aValue = a.metrics[sortKey] ?? 0;
        bValue = b.metrics[sortKey] ?? 0;
      }

      const order = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDir === 'asc' ? order : -order;
    });
  }, [data, sortKey, sortDir, directKeys]);

  return { sortKey, sortDir, handleSort, sortedData };
}
