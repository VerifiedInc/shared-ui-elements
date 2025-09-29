import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { Stack, SxProps } from '@mui/material';

import { useTTSMagicQRCode } from '../../hooks';

export type TTSMagicQRCodeHandle = {
  download(filename: string, extension: 'png' | 'svg'): Promise<void>;
};

function TTSMagicQRCodeComponent(
  {
    brandLogo,
    magicLink,
    sx,
  }: {
    brandLogo?: string;
    magicLink: string;
    sx?: SxProps;
  },
  ref: ForwardedRef<TTSMagicQRCodeHandle>,
) {
  const { qrcode } = useTTSMagicQRCode({ magicLink, brandLogo });

  useImperativeHandle(
    ref,
    () => ({
      download: qrcode.download,
    }),
    [qrcode],
  );

  return (
    <Stack
      sx={{
        width: 220,
        height: 220,
        '& >div': {
          display: 'flex',
        },
        '& svg, & img': {
          width: 220,
          height: 220,
          p: 1,
          backgroundColor: 'white',
        },
        aspectRatio: 1,
        ...sx,
      }}
    >
      <qrcode.Component />
    </Stack>
  );
}

export const TTSMagicQRCode = forwardRef(TTSMagicQRCodeComponent);
