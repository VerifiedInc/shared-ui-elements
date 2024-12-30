import { PropsWithChildren, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { Box } from '@mui/material';

type CounterProps = PropsWithChildren & {
  from: number;
  to: number;
  map?: (value: number) => string;
};

export function Counter({ children, from, to, map }: CounterProps) {
  const nodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = String(map ? map(value) : value);
      },
    });

    return () => controls.stop();
  }, [from, to, map]);

  return (
    <Box ref={nodeRef} component='span'>
      {children}
    </Box>
  );
}
