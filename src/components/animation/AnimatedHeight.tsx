import { type PropsWithChildren, type ReactElement, useRef } from 'react';
import { motion } from 'framer-motion';

import { useResizeObserver } from '../../hooks/useResizeObserver';

type AnimateHeightProps = {
  duration?: number;
};

export function AnimateHeight(
  props: PropsWithChildren<AnimateHeightProps>,
): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, height] = useResizeObserver(containerRef);
  return (
    <motion.div
      animate={{ height, transition: { duration: props.duration ?? 0.2 } }}
    >
      <div ref={containerRef}>{props.children}</div>
    </motion.div>
  );
}
