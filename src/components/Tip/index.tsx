import { type PropsWithChildren } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Code } from '@mui/icons-material';

interface TipProps extends PropsWithChildren {
  /**
   * Widens the popover past MUI Tooltip's ~300px default for content that must not wrap,
   * like a code snippet with a long line. Omit to keep the default.
   */
  maxWidth?: number | string;
}

export function Tip({ children, maxWidth }: TipProps): React.JSX.Element {
  return (
    <Tooltip
      title={children}
      arrow
      enterTouchDelay={0}
      componentsProps={
        maxWidth === undefined ? undefined : { tooltip: { sx: { maxWidth } } }
      }
    >
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
