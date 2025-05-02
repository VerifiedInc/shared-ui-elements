import { Box } from '@mui/material';
import React, { CSSProperties } from 'react';

export const WhenStyled = ({
  isVisible,
  children,
  sx,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  sx?: CSSProperties;
}) => {
  const style: CSSProperties = {
    visibility: isVisible ? 'visible' : 'hidden',
    position: isVisible ? 'static' : 'absolute',
    pointerEvents: isVisible ? 'auto' : 'none',
    // When invisible, ensure it's completely removed from the document flow
    // and doesn't affect scrolling
    top: isVisible ? 'auto' : 0,
    left: isVisible ? 'auto' : 0,
    height: isVisible ? 'auto' : 0,
    width: isVisible ? 'auto' : 0,
    overflow: isVisible ? 'visible' : 'hidden',
  };

  return <Box sx={{ ...style, ...sx }}>{children}</Box>;
};
