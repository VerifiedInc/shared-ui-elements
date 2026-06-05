import { useLayoutEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

import type { OnChangeFn } from '@tanstack/react-table';

/**
 * TanStack-style table state that is controlled when the consumer passes
 * the state prop and internal otherwise; the change handler resolves
 * updater functions and reports the next value either way.
 */
export function useControllableState<T>(
  initialValue: T,
  controlledValue: T | undefined,
  onChange?: (next: T) => void,
): [T, OnChangeFn<T>] {
  const [internalValue, setInternalValue] = useState<T>(initialValue);

  const value = controlledValue ?? internalValue;

  const handleChange: OnChangeFn<T> = (updater) => {
    const next =
      typeof updater === 'function'
        ? (updater as (previous: T) => T)(value)
        : updater;

    if (controlledValue === undefined) {
      setInternalValue(next);
    }

    onChange?.(next);
  };

  return [value, handleChange];
}

/**
 * Grouped columns produce multiple header rows. MUI's stickyHeader pins
 * every header cell at top: 0, so rows below the first must be offset by
 * the measured height of the rows above to stack instead of overlapping.
 *
 * `columnsKey` (the resolved column defs) remounts the header rows, so
 * the observer must re-attach to the new nodes whenever it changes.
 */
export function useHeaderRowTops(
  headerRowCount: number,
  columnsKey: unknown,
): {
  headerRowRefs: MutableRefObject<Array<HTMLTableRowElement | null>>;
  headerRowTops: number[];
} {
  const headerRowRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const [headerRowTops, setHeaderRowTops] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (headerRowCount <= 1) {
      setHeaderRowTops((previous) => (previous.length === 0 ? previous : []));
      return undefined;
    }

    const measure = () => {
      const tops: number[] = [];
      let offset = 0;

      for (let index = 0; index < headerRowCount; index += 1) {
        tops.push(offset);
        offset += headerRowRefs.current[index]?.offsetHeight ?? 0;
      }

      // Returning the previous array when nothing changed keeps the state
      // referentially stable so re-measures don't cause render loops.
      setHeaderRowTops((previous) =>
        previous.length === tops.length &&
        previous.every((top, index) => top === tops[index])
          ? previous
          : tops,
      );
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    // Re-measure when header rows change height (e.g. a resize wraps the
    // labels) — fires only on actual size changes.
    const observer = new ResizeObserver(measure);

    headerRowRefs.current
      .slice(0, headerRowCount)
      .forEach((row) => row && observer.observe(row));

    return () => observer.disconnect();
  }, [headerRowCount, columnsKey]);

  return { headerRowRefs, headerRowTops };
}

/**
 * Measured total height of the sticky header rows — the bidirectional
 * loading-newer indicator sticks right below them, and their height
 * varies with grouped headers and wrapping labels. Only measured while
 * `enabled` (bidirectional scroll is active); 0 otherwise.
 */
export function useStickyHeaderHeight(
  enabled: boolean,
  headerRowRefs: MutableRefObject<Array<HTMLTableRowElement | null>>,
  headerRowCount: number,
  columnsKey: unknown,
): number {
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const measure = () => {
      const height = headerRowRefs.current
        .slice(0, headerRowCount)
        .reduce((total, row) => total + (row?.offsetHeight ?? 0), 0);

      setHeaderHeight((previous) => (previous === height ? previous : height));
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    // Re-measure when header rows change height (e.g. a resize wraps the
    // labels) — fires only on actual size changes.
    const observer = new ResizeObserver(measure);

    headerRowRefs.current
      .slice(0, headerRowCount)
      .forEach((row) => row && observer.observe(row));

    return () => observer.disconnect();
  }, [enabled, headerRowRefs, headerRowCount, columnsKey]);

  return headerHeight;
}

/** Sticky offset maps for pinned columns (column id -> px). */
export type DataTablePinnedOffsets = {
  left: Record<string, number>;
  right: Record<string, number>;
};

/** Shallow-compares two sticky offset maps (column id -> px). */
function haveSameOffsets(
  a: Record<string, number>,
  b: Record<string, number>,
): boolean {
  const aKeys = Object.keys(a);

  return (
    aKeys.length === Object.keys(b).length &&
    aKeys.every((key) => a[key] === b[key])
  );
}

/**
 * Sticky offsets for pinned columns, measured from the rendered leaf
 * header cells — TanStack's own sizes assume the defs' sizes, which the
 * browser's table layout does not honor. Also returns the header cell
 * refs: they double as the width source for freezing column widths when a
 * resize drag starts.
 */
export function usePinnedOffsets(
  leftPinnedIds: string[],
  rightPinnedIds: string[],
  columnsKey: unknown,
): {
  headerCellRefs: MutableRefObject<Record<string, HTMLTableCellElement | null>>;
  pinnedOffsets: DataTablePinnedOffsets;
} {
  const headerCellRefs = useRef<Record<string, HTMLTableCellElement | null>>(
    {},
  );
  const [pinnedOffsets, setPinnedOffsets] = useState<DataTablePinnedOffsets>({
    left: {},
    right: {},
  });

  // Joined ids so the effect re-runs only when the pinned sets change.
  const leftPinnedKey = leftPinnedIds.join(',');
  const rightPinnedKey = rightPinnedIds.join(',');

  useLayoutEffect(() => {
    if (leftPinnedKey === '' && rightPinnedKey === '') {
      setPinnedOffsets((previous) =>
        Object.keys(previous.left).length === 0 &&
        Object.keys(previous.right).length === 0
          ? previous
          : { left: {}, right: {} },
      );
      return undefined;
    }

    const leftIds = leftPinnedKey === '' ? [] : leftPinnedKey.split(',');
    const rightIds = rightPinnedKey === '' ? [] : rightPinnedKey.split(',');

    const measure = () => {
      const left: Record<string, number> = {};
      let offset = 0;

      for (const id of leftIds) {
        left[id] = offset;
        offset +=
          headerCellRefs.current[id]?.getBoundingClientRect().width ?? 0;
      }

      // Right offsets accumulate from the right edge inward.
      const right: Record<string, number> = {};
      offset = 0;

      for (const id of [...rightIds].reverse()) {
        right[id] = offset;
        offset +=
          headerCellRefs.current[id]?.getBoundingClientRect().width ?? 0;
      }

      // Returning the previous object when nothing changed keeps the state
      // referentially stable so re-measures don't cause render loops.
      setPinnedOffsets((previous) =>
        haveSameOffsets(previous.left, left) &&
        haveSameOffsets(previous.right, right)
          ? previous
          : { left, right },
      );
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    // Re-measure when a pinned column changes width (drag-resize, data
    // reflowing the auto layout) — fires only on actual size changes.
    const observer = new ResizeObserver(measure);

    [...leftIds, ...rightIds].forEach((id) => {
      const cell = headerCellRefs.current[id];

      if (cell) {
        observer.observe(cell);
      }
    });

    return () => observer.disconnect();
    // columnsKey (the resolved column defs) remounts the header cells, so
    // the observer must re-attach to the new nodes.
  }, [leftPinnedKey, rightPinnedKey, columnsKey]);

  return { headerCellRefs, pinnedOffsets };
}
