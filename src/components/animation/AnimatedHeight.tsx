import { type PropsWithChildren, type ReactElement, useRef } from 'react';
import { motion } from 'framer-motion';

import { useResizeObserver } from '../../hooks/useResizeObserver';

export function AnimateHeight(props: PropsWithChildren): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, height] = useResizeObserver(containerRef);
  return (
    <motion.div animate={{ height, transition: { duration: 0.2 } }}>
      <div ref={containerRef}>{props.children}</div>
    </motion.div>
  );
}
