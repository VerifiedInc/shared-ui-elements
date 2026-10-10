import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

type WithMetrics = { metrics: Record<string, number> } & Record<
  string,
  unknown
>;

// How a non-metric column sorts: by the value the column shows.
export type BillableSortValues<T> = Record<string, (row: T) => string | number>;

export function useBillableSort<T extends WithMetrics>(
  data: T[] | undefined,
  directValues: BillableSortValues<T>,
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

  const setSort = (key: string, dir: SortDirection) => {
    setSortKey(key);
    setSortDir(dir);
  };

  const sortedData = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      const directValue = directValues[sortKey];
      if (directValue) {
        aValue = directValue(a);
        bValue = directValue(b);
      } else {
        aValue = a.metrics[sortKey] ?? 0;
        bValue = b.metrics[sortKey] ?? 0;
      }

      const order = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDir === 'asc' ? order : -order;
    });
  }, [data, sortKey, sortDir, directValues]);

  return { sortKey, sortDir, handleSort, setSort, sortedData };
}
