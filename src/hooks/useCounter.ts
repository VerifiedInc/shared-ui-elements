import { useEffect, useRef } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion';

interface UseCounterProps {
  from: number;
  to: number;
  map?: (value: number) => string;
  duration?: number;
}

interface UseCounterReturn {
  ref: React.RefObject<HTMLElement>;
  controls: React.MutableRefObject<AnimationPlaybackControls | null>;
}

export function useCounter({
  from,
  to,
  duration = 1,
  map,
}: UseCounterProps): UseCounterReturn {
  const nodeRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = String(map ? map(value) : value);
      },
    });

    controlsRef.current = controls;

    return () => {
      controls.stop();
    };
  }, [from, to, map, duration]);

  return {
    ref: nodeRef,
    controls: controlsRef,
  };
}
