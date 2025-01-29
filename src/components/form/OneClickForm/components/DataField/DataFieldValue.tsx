import { PropsWithChildren } from 'react';
import { SxProps, Typography } from '@mui/material';

type DataFieldValueProps = PropsWithChildren & {
  sx?: SxProps;
};

/**
 * Component to display a credential value of display type Text.
 * @param children
 * @param sx
 * @constructor
 */
export function DataFieldValue({ children, sx }: DataFieldValueProps) {
  return (
    <Typography
      variant='body1'
      sx={
        {
          wordBreak: 'break-word',
          my: 0.5,
          ...sx,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // 'data-sentry-mask':
          //   appContext.config.env.env === 'production' || undefined,
        } as any
      }
    >
      {children}
    </Typography>
  );
}
