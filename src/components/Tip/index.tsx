import { type PropsWithChildren } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Code } from '@mui/icons-material';

export function Tip({ children }: PropsWithChildren) {
  return (
    <Tooltip title={children} arrow enterTouchDelay={0}>
      <IconButton
        size='small'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Code />
      </IconButton>
    </Tooltip>
  );
}
