import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { Virtualizer } from '@tanstack/react-virtual';

import { useBidirectionalScroll } from '../../src/hooks/useBidirectionalScroll';

function createContainer(): HTMLDivElement {
  const container = document.createElement('div');
  Object.defineProperty(container, 'scrollHeight', { value: 2000 });
  Object.defineProperty(container, 'clientHeight', { value: 500 });
  container.scrollTop = 0;
  return container;
}

function renderScroll(
  container: HTMLDivElement,
  options: { hasNewer?: boolean; isLoadingNewer?: boolean } = {},
) {
  const onLoadNewer = vi.fn();
  const onLoadOlder = vi.fn();
  renderHook(() =>
    useBidirectionalScroll({
      scrollContainerRef: { current: container },
      virtualizer: { measure: vi.fn() } as unknown as Virtualizer<
        HTMLDivElement,
        Element
      >,
      rowCount: 20,
      hasNewer: options.hasNewer ?? true,
      hasOlder: true,
      isLoadingNewer: options.isLoadingNewer ?? false,
      isLoadingOlder: false,
      onLoadNewer,
      onLoadOlder,
    }),
  );
  return { onLoadNewer, onLoadOlder };
}

function touch(type: string, clientY: number): Event {
  const event = new Event(type);
  Object.defineProperty(event, 'touches', { value: [{ clientY }] });
  return event;
}

describe('useBidirectionalScroll()', () => {
  test('wheeling up at the top loads newer rows without scrolling away first', () => {
    const container = createContainer();
    const { onLoadNewer } = renderScroll(container);

    container.dispatchEvent(new WheelEvent('wheel', { deltaY: -40 }));

    expect(onLoadNewer).toHaveBeenCalledTimes(1);
  });

  test('pulling down with a finger at the top loads newer rows', () => {
    const container = createContainer();
    const { onLoadNewer } = renderScroll(container);

    container.dispatchEvent(touch('touchstart', 100));
    container.dispatchEvent(touch('touchmove', 160));

    expect(onLoadNewer).toHaveBeenCalledTimes(1);
  });

  test('wheeling down at the top does not load newer rows', () => {
    const container = createContainer();
    const { onLoadNewer } = renderScroll(container);

    container.dispatchEvent(new WheelEvent('wheel', { deltaY: 40 }));

    expect(onLoadNewer).not.toHaveBeenCalled();
  });

  test('wheeling up away from the top does not load newer rows', () => {
    const container = createContainer();
    container.scrollTop = 300;
    const { onLoadNewer } = renderScroll(container);

    container.dispatchEvent(new WheelEvent('wheel', { deltaY: -40 }));

    expect(onLoadNewer).not.toHaveBeenCalled();
  });

  test('does nothing when there are no newer rows or a fetch is in flight', () => {
    const idle = createContainer();
    const loading = createContainer();
    const noNewer = renderScroll(idle, { hasNewer: false });
    const inFlight = renderScroll(loading, { isLoadingNewer: true });

    idle.dispatchEvent(new WheelEvent('wheel', { deltaY: -40 }));
    loading.dispatchEvent(new WheelEvent('wheel', { deltaY: -40 }));

    expect(noNewer.onLoadNewer).not.toHaveBeenCalled();
    expect(inFlight.onLoadNewer).not.toHaveBeenCalled();
  });
});
