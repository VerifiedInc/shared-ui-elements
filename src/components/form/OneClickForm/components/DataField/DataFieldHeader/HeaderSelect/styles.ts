import { SxProps } from '@mui/material';

export const styles = (): Record<string, SxProps> => ({
  menuStyle: {
    maxWidth: '100%',
    whiteSpace: 'pre-wrap',
    flexWrap: 'wrap',
    // Increase image and it loader in menu item.
    '& *': {
      display: 'inline-flex',
    },
    '& div': {
      width: 'fit-content',
      height: 'fit-content',
    },
    '& img.MuiBox-root, & .image-encoded-skeleton-container, & .MuiSkeleton-root':
      {
        display: 'inline-flex',
        width: '100px',
        height: '100px',
      },
  },
  fieldInputEnabledStyle: {
    '& .MuiInputBase-root::before, & .MuiInputBase-root::after': {
      display: 'none !important',
    },
    '& .MuiSelect-icon': {
      display: 'none',
    },
  },
  fieldInputDisabledStyle: {
    pointerEvents: 'auto',
  },
  blockStyle: {
    display: 'inline-flex',
  },
});
