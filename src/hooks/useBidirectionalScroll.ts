import { useEffect, useLayoutEffect, useRef } from 'react';
import { debounce } from 'lodash';
import type { Virtualizer } from '@tanstack/react-virtual';

interface UseBidirectionalScrollOptions {
  /** Ref to the scrollable container element */
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  /** The virtualizer instance (needed to recalculate after scroll adjustment) */
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  /** Current row count — used to detect when new data arrives */
  rowCount: number;
  /** Whether there are newer pages available */
  hasNewer?: boolean;
  /** Whether there are older pages available */
  hasOlder?: boolean;
  /** Whether a newer-page fetch is currently in flight */
  isLoadingNewer?: boolean;
  /** Whether an older-page fetch is currently in flight */
  isLoadingOlder?: boolean;
  /** Callback to fetch the next newer page */
  onLoadNewer: () => void;
  /** Callback to fetch the next older page */
  onLoadOlder: () => void;
  /** Debounce delay in ms (default 300) */
  debounceMs?: number;
  /** Distance in px the user must scroll away from an edge before it re-arms (default 100) */
  rearmDistance?: number;
  /**
   * When this value changes, the hook resets scroll position to top and
   * clears any in-flight snapshots. Use a value derived from your active
   * filters (e.g. a serialised filter string or a counter).
   */
  resetKey?: string | number;
}

/**
 * Manages bidirectional infinite scroll for a virtualised, reverse-chronological list.
 *
 * - Triggers `onLoadNewer` when the user scrolls to the top.
 * - Triggers `onLoadOlder` when the user scrolls to the bottom.
 * - Preserves the scroll position when newer rows are prepended so the
 *   viewport doesn't jump.
 */
export function useBidirectionalScroll({
  scrollContainerRef,
  virtualizer,
  rowCount,
  hasNewer,
  hasOlder,
  isLoadingNewer,
  isLoadingOlder,
  onLoadNewer,
  onLoadOlder,
  debounceMs = 300,
  rearmDistance = 100,
  resetKey,
}: UseBidirectionalScrollOptions) {
  const snapshotRef = useRef<{
    scrollHeight: number;
    scrollTop: number;
  } | null>(null);
  const wasLoadingNewerRef = useRef(false);

  const olderArmedRef = useRef(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
    snapshotRef.current = null;
    wasLoadingNewerRef.current = false;
    // Disarm older-load until the user scrolls away from the bottom edge,
    // preventing a spurious loadOlder when the container is empty after reset.
    olderArmedRef.current = false;
  }, [resetKey, scrollContainerRef]);

  // Phase 1: snapshot when the newer fetch starts
  useEffect(() => {
    if (isLoadingNewer && !wasLoadingNewerRef.current) {
      const container = scrollContainerRef.current;
      if (container) {
        snapshotRef.current = {
          scrollHeight: container.scrollHeight,
          scrollTop: container.scrollTop,
        };
      }
    }
    wasLoadingNewerRef.current = !!isLoadingNewer;
  }, [isLoadingNewer, scrollContainerRef]);

  // Phase 2: restore after new rows are committed to the DOM
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    const snapshot = snapshotRef.current;
    if (container && snapshot) {
      const delta = container.scrollHeight - snapshot.scrollHeight;
      if (delta > 0) {
        container.scrollTop = snapshot.scrollTop + delta;
      }
      snapshotRef.current = null;
      virtualizer.measure();
    }
  }, [rowCount, virtualizer, scrollContainerRef]);

  const hasOlderRef = useRef(hasOlder);
  const hasNewerRef = useRef(hasNewer);
  const isLoadingOlderRef = useRef(isLoadingOlder);
  const isLoadingNewerRef = useRef(isLoadingNewer);
  const onLoadOlderRef = useRef(onLoadOlder);
  const onLoadNewerRef = useRef(onLoadNewer);
  hasOlderRef.current = hasOlder;
  hasNewerRef.current = hasNewer;
  isLoadingOlderRef.current = isLoadingOlder;
  isLoadingNewerRef.current = isLoadingNewer;
  onLoadOlderRef.current = onLoadOlder;
  onLoadNewerRef.current = onLoadNewer;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let newerArmed = false;

    const loadNewer = debounce(
      () => {
        if (hasNewerRef.current && !isLoadingNewerRef.current) {
          onLoadNewerRef.current();
        }
      },
      debounceMs,
      { leading: true, trailing: false },
    );

    const loadOlder = debounce(
      () => {
        if (hasOlderRef.current && !isLoadingOlderRef.current) {
          onLoadOlderRef.current();
        }
      },
      debounceMs,
      { leading: true, trailing: false },
    );

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // No scrollable content — don't arm or fire either trigger.
      if (scrollHeight <= clientHeight) return;

      if (scrollTop > rearmDistance) newerArmed = true;
      if (distanceFromBottom > rearmDistance) olderArmedRef.current = true;

      if (
        newerArmed &&
        hasNewerRef.current &&
        !isLoadingNewerRef.current &&
        scrollTop <= 1
      ) {
        newerArmed = false;
        loadNewer();
      }

      if (
        olderArmedRef.current &&
        hasOlderRef.current &&
        !isLoadingOlderRef.current &&
        distanceFromBottom <= 1
      ) {
        olderArmedRef.current = false;
        loadOlder();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      loadNewer.cancel();
      loadOlder.cancel();
    };
  }, [scrollContainerRef, debounceMs, rearmDistance]);
}
