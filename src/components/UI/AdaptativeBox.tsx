import { Box, BoxProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { MotionBox } from '../animation/motions';

type AdaptativeBoxProps = Readonly<BoxProps>;

/**
 * Adaptative box component to adapt its height to its content.
 */
export function AdaptativeBox(props: AdaptativeBoxProps) {
  const { children, ...rest } = props;
  const [height, setHeight] = useState<'auto' | number>('auto');
  const [width, setWidth] = useState<'auto' | number>('auto');
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Adapt the height of the box to its content
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWidth(width);
        setHeight(height);
      }
    });

    observer.observe(boxRef.current as Element);

    document.addEventListener('resize', () => {
      boxRef.current && observer.observe(boxRef.current as Element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <MotionBox {...(rest as any)} animate={{ width, height }}>
      <Box
        ref={boxRef}
        sx={{ display: 'inline-flex', overflow: 'hidden', whiteSpace: 'pre' }}
      >
        {children}
      </Box>
    </MotionBox>
  );
}
