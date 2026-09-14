/**
 * Stand-in for `@tanstack/react-virtual`: jsdom has no layout, so the real virtualizer measures
 * every row as zero and renders none. This one renders them all.
 *
 * Usage, at the top of a test file:
 * `vi.mock('@tanstack/react-virtual', async () => await import('<path>/tests/utils/mockReactVirtual'));`
 */
export function useVirtualizer({
  count,
  estimateSize,
}: {
  count: number;
  estimateSize: () => number;
}) {
  const size = estimateSize();
  return {
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        key: index,
        start: index * size,
        end: (index + 1) * size,
        size,
        lane: 0,
      })),
    getTotalSize: () => count * size,
    measure: () => undefined,
    measureElement: () => undefined,
    scrollToOffset: () => undefined,
  };
}
